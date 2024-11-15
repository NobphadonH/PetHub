import { connectToDatabase } from "../utils/dbConnection.js";
import {
  uploadFileToS3,
  downloadFileFromS3,
  deleteFileFromS3,
} from "../utils/s3FileTransfer.js";
import jwt from "jsonwebtoken";
import fs from "fs";

// *** Waiting for test this function ***
export const createPet = async (req, res) => {
  try {
    const { petName, petDOB, petType, petDetail, petSex} = req.body;
    const { dbpool, sshClient } = await connectToDatabase();
    const userID = req.user.userID;

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
            INSERT INTO Pets (petName, petDOB, petType, petDetail, petSex, userID, petPhoto)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `;
          const values = [
            petName,
            petDOB,
            petType,
            petDetail,
            petSex,
            userID,
            url,
          ];

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

export const getAllPetsByUserID = async (req, res) => {
  try {
    const { dbpool, sshClient } = await connectToDatabase();
    const userID = req.user.userID;

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
    const { petID} = req.body; // Extract petID and userID from request body
    const { dbpool, sshClient } = await connectToDatabase();
    const userID = req.user.userID;

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
    const { petID, petName, petDOB, petDetail, petSex } = req.body;
    const { dbpool, sshClient } = await connectToDatabase();
    const userID = req.user.userID;

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
    if (petSex) {
      updates.push(" petSex = ?");
      values.push(petSex);
    }

    // Fetch existing pet photo URL if req.file is provided
    if (req.file) {
      dbpool.getConnection((err, connection) => {
        if (err) {
          console.error("Error getting connection from pool:", err);
          sshClient.end();
          return res.status(500).json({ error: "Database connection failed" });
        }

        // Fetch the current pet photo URL
        connection.query(
          `SELECT petPhoto FROM Pets WHERE petID = ? AND userID = ?`,
          [petID, userID],
          async (err, results) => {
            if (err) {
              console.error("Error fetching pet photo:", err);
              connection.release();
              sshClient.end();
              return res
                .status(500)
                .json({ error: "Failed to retrieve pet photo" });
            }

            const currentPhotoUrl = results[0]?.petPhoto;
            if (currentPhotoUrl) {
              await deleteFileFromS3(currentPhotoUrl); // Delete the old file from S3
            }

            // Upload the new image to S3
            const filePath = req.file.path;
            const fileName = req.file.filename;
            const fileContent = fs.readFileSync(filePath);
            const fileMimeType = req.file.mimetype;
            const newPhotoUrl = await uploadFileToS3(
              fileName,
              fileContent,
              fileMimeType
            );

            // Add new photo URL to the update query
            updates.push("petPhoto = ?");
            values.push(newPhotoUrl);

            // Add petID and userID to the query
            values.push(petID, userID);

            // Update the pet details in the database
            const query = `UPDATE Pets SET ${updates.join(
              ", "
            )} WHERE petID = ? AND userID = ?`;
            connection.query(query, values, (err, result) => {
              if (err) {
                console.error("Error updating pet:", err);
                connection.release();
                sshClient.end();
                return res
                  .status(500)
                  .json({ error: "Failed to update pet information" });
              }

              res
                .status(200)
                .json({ message: "Pet information updated successfully" });
              connection.release();
              sshClient.end();
            });
          }
        );
      });
    } else {
      // If no file is provided, simply update other fields
      values.push(petID, userID);
      const query = `UPDATE Pets SET ${updates.join(
        ", "
      )} WHERE petID = ? AND userID = ?`;

      dbpool.getConnection((err, connection) => {
        if (err) {
          console.error("Error getting connection from pool:", err);
          sshClient.end();
          return res.status(500).json({ error: "Database connection failed" });
        }

        connection.query(query, values, (err, result) => {
          if (err) {
            console.error("Error updating pet:", err);
            connection.release();
            sshClient.end();
            return res
              .status(500)
              .json({ error: "Failed to update pet information" });
          }

          res
            .status(200)
            .json({ message: "Pet information updated successfully" });
          connection.release();
          sshClient.end();
        });
      });
    }
  } catch (error) {
    console.log("Error in updatePetByPetID controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMatchingPets = async (req, res) => {
  try {
    const { petAllowedType } = req.body;
    const { dbpool, sshClient } = await connectToDatabase();
    const userID = req.user.userID;

    dbpool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting connection from pool:", err);
        sshClient.end();
        return res.status(500).json({ error: "Database connection failed" });
      }

      const query = `
        SELECT * 
        FROM Pets 
        WHERE userID = ? AND petType = ?
      `;

      connection.query(
        query,
        [userID, petAllowedType],
        async (err, results) => {
          if (err) {
            console.error("Error executing query:", err);
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
        }
      );
    });
  } catch (error) {
    console.error("Error in getMatchingPets controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
