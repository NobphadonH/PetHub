import { connectToDatabase } from "../utils/dbConnection.js";

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

    dbpool.getConnection(async (err, connection) => {
      if (err) {
        console.error("Error getting connection from pool:", err);
        sshClient.end();
        return res.status(500).json({ error: "Database connection failed" });
      }

      // Insert new pet into Pets table
      const query = `
        INSERT INTO Pets (petName, petDOB, petType, petDetail, userID)
        VALUES (?, ?, ?, ?, ?)
      `;
      const values = [petName, petDOB, petType, petDetail, userID];

      connection.query(query, values, (err, result) => {
        if (err) {
          console.error("Error executing query:", err);
          connection.release(); // Ensure connection is released on error
          sshClient.end();
          return res.status(500).json({ error: "Failed to register pet" });
        }

        res.status(201).json({ message: "Pet registered successfully" });
        connection.release(); // Release the connection back to the pool
        sshClient.end();
        console.log("Connections closed.");
      });
    });
  } catch (error) {
    console.log("Error in petRegister controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllPetsByUserID = async (req, res) => {
  try {
    const { userID } = req.body; // assuming userID is passed as a URL parameter
    const { dbpool, sshClient } = await connectToDatabase();

    dbpool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting connection from pool:", err);
        sshClient.end();
        return res.status(500).json({ error: "Database connection failed" });
      }

      // Query to get all pets for the specified userID
      const query = `SELECT * FROM Pets WHERE userID = ?`;
      connection.query(query, [userID], (err, results) => {
        if (err) {
          console.error("Error executing query:", err);
          return res.status(500).json({ error: "Query execution failed" });
        }

        // Return the list of pets associated with the userID
        console.log(results);
        res.status(200).json(results);
        connection.release(); // Release the connection back to the pool
        sshClient.end();
        console.log("Connections closed.");
      });
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

//มันหายทั้งคอลัมน์เลยอย่างพึ่งใช้
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
