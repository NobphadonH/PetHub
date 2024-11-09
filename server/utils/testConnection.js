import { connectToDatabase } from "./dbConnection.js"; // Adjust the path if needed
import {S3Client, ListBucketsCommand} from "@aws-sdk/client-s3";


 
const testF = async () => {
  try {
    const { dbpool, sshClient } = await connectToDatabase();
    console.log("Connection to RDS via SSH tunnel established successfully.");

    // Using the pool to get a connection and run a query
    dbpool.getConnection((err, connection) => {
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

const testS3 = async() => {
  const s3 = new S3Client({region: 'ap-southeast-2'})

  const params = {
    Bucket: process.env.S3_BUCKET_NAME
  }

  try {
    const data = await s3.send(new ListBucketsCommand(params))
    console.log(data)
  } catch (err) {
    console.log("s3 error", err);
  }
}

testS3()
