import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "../utils/dbConnection.js";


export const signin = async (req, res) => {
  try {
    const { username, email, password} = req.body;
    const { dbpool, sshClient } = await connectToDatabase();
    
    console.log("hello");

    dbpool.getConnection(async (err, connection) => {
      if (err) {
        console.error("Error getting connection from pool:", err);
        sshClient.end();
        return;
      }

      // Update the query to check for either username or email
      connection.query(
        "SELECT * FROM Users WHERE (username = ?)",
        [username],
        async (err, rows) => {
          if (err) throw err;
          const user = rows[0];

          if (!user) {
            console.log("query empty");
            return res
              .status(400)
              .json({ error: "Invalid username, email, or password" });
          }

          // Compare passwords
          const isPasswordCorrect = await bcrypt.compare(
            password,
            user["password"]
          );

          if (!isPasswordCorrect) {
            return res
              .status(400)
              .json({ error: "Invalid username, email, or password" });
          }

          // Login successful, generate token and set cookie
          const userID = user["userID"];
          const userRole = user["userRole"];  // Retrieve userRole from query result

          const token = jwt.sign({ userID, userRole }, "Bhun-er", {
            expiresIn: "15d",
          });

          console.log("login success");
          res
            .cookie("jwt", token, {
              maxAge: 15 * 24 * 60 * 60 * 1000,
              httpOnly: true,
              sameSite: "strict",
              secure: process.env.NODE_ENV !== "development",
            })
            .status(200)
            .json({ token, userRole });  // Add userRole to response

            connection.release(); // Release the connection back to the pool
            sshClient.end();
            console.log("Connections closed.");
        }
      );
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

  
export const signout = (req, res) => {
  try {
    console.log(req);
    res.cookie("user-auth", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
  
export const signup = async (req, res) => {
  try {
    const { username, fName, lName, email, password, address, phone, userRole } = req.body;
    const { dbpool, sshClient } = await connectToDatabase();

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Username, email, and password are required." });
    }

    dbpool.getConnection(async (err, connection) => {
      if (err) {
        console.error("Error getting connection from pool:", err);
        sshClient.end();
        return;
      }

      // const query = `
      //        INSERT INTO Users (username, fName, lName, email, password, address, phone, userRole) 
      //        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      //      `;

      // const hashedPassword = await bcrypt.hash(password, 10);
      // const values = [username, fName, lName, email, hashedPassword, address, phone, userRole];

      // connection.query(query, values, (err, result) => {
      //   //connection.release(); // Release the connection back to the pool

      //   if (err) {
      //     console.error("Error executing query:", err);
      //     connection.release(); // Ensure connection is released on error
      //     sshClient.end();
      //     return res.status(500).json({ error: "Query execution failed" });
      //   }
        
      //   connection.release();
      //   sshClient.end();
      //   res.status(201).json({ message: "User registered successfully" });
      // });




        // Check if username or email already exists
      connection.query(
        "SELECT * FROM Users WHERE Username = ? OR Email = ?",
        [username, email],
        async (err, rows) => {
          if (err) throw err;
  
          if (rows.length > 0) {
            return res.status(400).json({ error: "Username or email already exists" });
          }
          const hashedPassword = await bcrypt.hash(password, 10);
  
            // Insert new user without specifying userID (it will auto-increment)
          const query = `
            INSERT INTO Users (username, fName, lName, email, password, address, phone, userRole) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `;
          const values = [username, fName, lName, email, hashedPassword, address, phone, userRole];
  
          connection.query(query, values, (err, result) => {
            //connection.release(); // Release the connection back to the pool
  
            if (err) {
              console.error("Error executing query:", err);
              connection.release(); // Ensure connection is released on error
              sshClient.end();
              return res.status(500).json({ error: "Query execution failed" });
            }
            
            connection.release(); // Release the connection back to the pool
            sshClient.end();
            console.log("Connections closed.");
            res.status(201).json({ message: "User registered successfully" });
          });
        }
      );
    });
    } catch (error) {
      console.log("Error in register controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };