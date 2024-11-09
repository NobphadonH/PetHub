import { connectToDatabase } from "../utils/dbConnection.js";

export const getProfilebyUserID = async (req, res) => {
    try {
        // Extract userID from the request body
        const { userID } = req.body;

        // Connect to the database and SSH client
        const { dbpool, sshClient } = await connectToDatabase();

        // Get a connection from the database pool
        dbpool.getConnection((err, connection) => {
            if (err) {
                // Log error and close SSH if connection fails
                console.error("Error getting connection:", err);
                sshClient.end();
                return res.status(500).json({ error: "Database connection failed" });
            }

            // Query to fetch user data by userID
            const query = `SELECT * FROM Users WHERE userID = ?`;
            connection.query(query, [userID], (err, results) => {
                if (err) {
                    // Log error if query fails
                    console.error("Query error:", err);
                    return res.status(500).json({ error: "Query execution failed" });
                } else {
                    // Return results on success
                    console.log(results);
                    res.status(200).json(results);
                }

                // Release connection and close SSH
                connection.release();
                sshClient.end();
                console.log("Connections closed.");
            });
        });
    } catch (error) {
        // Log unexpected errors
        console.error("Error in getProfilebyUserID:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Async function to update user profile by userID
export const updateProfilebyUserID = async (req, res) => {
    try {
        // Extract fields from the request body
        const { userID, fName, lName, email, address } = req.body;

        // Connect to the database and SSH client
        const { dbpool, sshClient } = await connectToDatabase();

        // Get a connection from the database pool
        dbpool.getConnection((err, connection) => {
            if (err) {
                // Log error and close SSH if connection fails
                console.error("Error getting connection:", err);
                sshClient.end();
                return res.status(500).json({ error: "Database connection failed" });
            }

            // Prepare update fields and values
            const updates = [];
            const values = [];

            // Add update statements if fields are provided
            if (fName) {
                updates.push("fName = ?");
                values.push(fName);
            }
            if (lName) {
                updates.push("lName = ?");
                values.push(lName);
            }
            if (email) {
                updates.push("email = ?");
                values.push(email);
            }
            if (address) {
                updates.push("address = ?");
                values.push(address);
            }

            // Build and execute the SQL update query
            const query = `UPDATE Users SET ${updates.join(", ")} WHERE userID = ?`;
            connection.query(query, [...values, userID], (err, results) => {
                if (err) {
                    // Log error if query fails
                    console.error("Query error:", err);
                    return res.status(500).json({ error: "Query failed" });
                } else {
                    // Return results on success
                    console.log(results);
                    res.status(200).json(results);
                }
                
                // Release connection and close SSH
                connection.release();
                sshClient.end();
                console.log("Connections closed.");
            });
        });
    } catch (error) {
        // Log unexpected errors
        console.error("Error in updateProfilebyUserID:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};