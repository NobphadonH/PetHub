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
// export const updatePetByPetID = async (req, res) => {
//   try {
//     const { petName, petDOB, petDetail, petID, userID } = req.body; // Extract petID and userID from request body
//     const { dbpool, sshClient } = await connectToDatabase();

//     dbpool.getConnection((err, connection) => {
//       if (err) {
//         console.error("Error getting connection from pool:", err);
//         sshClient.end();
//         return res.status(500).json({ error: "Database connection failed" });
//       }

//       // Query to update only allowed pet details (petName, petDOB, petDetail) for the specified petID and userID
//       const query = `
//           UPDATE Pets
//           SET petName = ?, petDOB = ?, petDetail = ?
//           WHERE petID = ? AND userID = ?
//         `;
//       const values = [petName, petDOB, petDetail, petID, userID];

//       connection.query(query, values, (err, result) => {
//         if (err) {
//           console.error("Error executing query:", err);
//           return res.status(500).json({ error: "Query execution failed" });
//         }

//         // Check if any row was affected
//         if (result.affectedRows === 0) {
//           return res
//             .status(404)
//             .json({ error: "Pet not found or does not belong to this user" });
//         }

//         res.status(200).json({ message: "Pet updated successfully" });
//         connection.release(); // Release the connection back to the pool
//         sshClient.end();
//         console.log("Connections closed.");
//       });
//     });
//   } catch (error) {
//     console.error("Error in updatePetByPetID controller:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
