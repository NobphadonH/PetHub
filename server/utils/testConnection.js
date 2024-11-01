import { connectToDatabase } from "./dbConnection.js"; // Adjust the path if needed

const testF = async () => {
  try {
    const { pool, sshClient } = await connectToDatabase();
    console.log("Connection to RDS via SSH tunnel established successfully.");

    // Using the pool to get a connection and run a query
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting connection from pool:", err);
        sshClient.end();
        return;
      }

      connection.query("SELECT * FROM Users", (error, results) => {
        if (error) {
          console.error("Test query failed:", error);
        } else {
          console.log("Test query result:", results); // Log the entire results
        }

        // Close the connection and SSH client after the test
        connection.release(); // Release the connection back to the pool
        sshClient.end();
        console.log("Connections closed.");
      });
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);
  }
};

// Call the function
testF();
