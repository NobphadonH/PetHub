import { connectToDatabase } from "../utils/dbConnection.js";
import { uploadFileToS3, downloadFileFromS3 } from "../utils/s3FileTransfer.js";
import fs from "fs";

// *** Waiting for test this function ***
export const createPet = async (req, res) => {
  try {
    const { petName, petDOB, petType, petDetail, userID } = req.body;
    const { dbpool, sshClient } = await connectToDatabase();

    // Check if all required fields are provided
    if (!petName || !petDOB || !petType || !userID) {
      return res
        .status(400)
        .json({ error: "All pet details and userID are required." });
    }

    // Check if a file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: "Pet photo is required." });
    }

    const filePath = req.file.path;
    const fileName = req.file.filename;
    const fileContent = fs.readFileSync(filePath);
    const fileMimeType = req.file.mimetype;

    // Upload pet photo to S3
    uploadFileToS3(fileName, fileContent, fileMimeType)
      .then((url) => {
        console.log("Uploaded file URL:", url);

        dbpool.getConnection(async (err, connection) => {
          if (err) {
            console.error("Error getting connection from pool:", err);
            sshClient.end();
            return res
              .status(500)
              .json({ error: "Database connection failed" });
          }

          // Insert new pet into Pets table with the S3 URL
          const query = `
            INSERT INTO Pets (petName, petDOB, petType, petDetail, userID, petPhoto)
            VALUES (?, ?, ?, ?, ?, ?)
          `;
          const values = [petName, petDOB, petType, petDetail, userID, url];

          connection.query(query, values, (err, result) => {
            connection.release(); // Release the connection back to the pool
            sshClient.end();

            if (err) {
              console.error("Error executing query:", err);
              return res.status(500).json({ error: "Failed to register pet" });
            }

            res.status(201).json({
              message: "Pet registered successfully",
              petID: result.insertId,
              petPhoto: url,
            });
            console.log("Pet registration completed.");
          });
        });
      })
      .catch((error) => {
        console.error("Photo upload failed:", error);
        res.status(500).json({ error: "Failed to upload pet photo" });
      });
  } catch (error) {
    console.error("Error in createPet controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//*** This function doesn't test yet. ***
export const getAllPetsByUserID = async (req, res) => {
  try {
    const { userID } = req.body; // Assuming userID is passed in the request body
    const { dbpool, sshClient } = await connectToDatabase();

    dbpool.getConnection(async (err, connection) => {
      if (err) {
        console.error("Error getting connection from pool:", err);
        sshClient.end();
        return res.status(500).json({ error: "Database connection failed" });
      }

      try {
        // Query to get all pets for the specified userID
        const query = `SELECT * FROM Pets WHERE userID = ?`;
        connection.query(query, [userID], async (err, results) => {
          if (err) {
            console.error("Error executing query:", err);
            connection.release();
            sshClient.end();
            return res.status(500).json({ error: "Query execution failed" });
          }

          // Fetch photo data for each pet from S3
          const petsWithPhotos = await Promise.all(
            results.map(async (pet) => {
              try {
                const photoData = await downloadFileFromS3(pet.petPhoto);
                const petPhotoBuffer = photoData.Body;
                return {
                  ...pet,
                  petPhoto: `data:${
                    photoData.ContentType
                  };base64,${petPhotoBuffer.toString("base64")}`,
                };
              } catch (error) {
                console.error(
                  `Failed to download photo for petID ${pet.petID}:`,
                  error
                );
                // If download fails, include the pet data without the photo
                return { ...pet, petPhoto: null };
              }
            })
          );

          res.status(200).json(petsWithPhotos);
          connection.release();
          sshClient.end();
          console.log("Connections closed.");
        });
      } catch (error) {
        console.error("Error processing pet photos:", error);
        connection.release();
        sshClient.end();
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  } catch (error) {
    console.error("Error in getAllPetsByUserID controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deletePetByPetID = async (req, res) => {
  try {
    const { petID, userID } = req.body; // Extract petID and userID from request body
    const { dbpool, sshClient } = await connectToDatabase();

    dbpool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting connection from pool:", err);
        sshClient.end();
        return res.status(500).json({ error: "Database connection failed" });
      }

      // Query to delete pet with the given petID and userID
      const query = `DELETE FROM Pets WHERE petID = ? AND userID = ?`;
      connection.query(query, [petID, userID], (err, result) => {
        if (err) {
          console.error("Error executing query:", err);
          return res.status(500).json({ error: "Query execution failed" });
        }

        // Check if a row was actually deleted
        if (result.affectedRows === 0) {
          return res
            .status(404)
            .json({ error: "Pet not found or does not belong to this user" });
        }

        res.status(200).json({ message: "Pet deleted successfully" });
        connection.release(); // Release the connection back to the pool
        sshClient.end();
        console.log("Connections closed.");
      });
    });
  } catch (error) {
    console.error("Error in deletePetByPetID controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updatePetByPetID = async (req, res) => {
  try {
    const { petID, userID, petName, petDOB, petDetail } = req.body; // Extract values from request body
    const { dbpool, sshClient } = await connectToDatabase();

    // Build query parts dynamically based on provided fields
    const updates = [];
    const values = [];

    if (petName) {
      updates.push("petName = ?");
      values.push(petName);
    }
    if (petDOB) {
      updates.push("petDOB = ?");
      values.push(petDOB);
    }
    if (petDetail) {
      updates.push("petDetail = ?");
      values.push(petDetail);
    }

    // Check if at least one field is provided for update
    if (updates.length === 0) {
      return res.status(400).json({ error: "No fields provided for update" });
    }

    // Construct the final query with the dynamic parts
    const query = `
      UPDATE Pets 
      SET ${updates.join(", ")}
      WHERE petID = ? AND userID = ?
    `;
    values.push(petID, userID); // Add petID and userID to the values array

    dbpool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting connection from pool:", err);
        sshClient.end();
        return res.status(500).json({ error: "Database connection failed" });
      }

      connection.query(query, values, (err, result) => {
        if (err) {
          console.error("Error executing query:", err);
          return res.status(500).json({ error: "Query execution failed" });
        }

        // Check if any row was affected
        if (result.affectedRows === 0) {
          return res
            .status(404)
            .json({ error: "Pet not found or does not belong to this user" });
        }

        res.status(200).json({ message: "Pet updated successfully" });
        connection.release(); // Release the connection back to the pool
        sshClient.end();
        console.log("Connections closed.");
      });
    });
  } catch (error) {
    console.error("Error in updatePetByPetID controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
