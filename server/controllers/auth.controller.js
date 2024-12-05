import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "../utils/dbConnection.js";

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { dbpool, sshClient } = await connectToDatabase();

    dbpool.getConnection(async (err, connection) => {
      if (err) {
        console.error("Error getting connection from pool:", err);
        sshClient.end();
        return;
      }

      // Update the query to fetch fName and lName
      connection.query(
        "SELECT userID, userRole, fName, lName, password FROM Users WHERE email = ?",
        [email],
        async (err, rows) => {
          if (err) throw err;
          const user = rows[0];

          if (!user) {
            console.log("query empty");
            return res
              .status(400)
              .json({ error: "Invalid email, or password" });
          }

          // Compare passwords
          const isPasswordCorrect = await bcrypt.compare(
            password,
            user["password"]
          );

          if (!isPasswordCorrect) {
            return res
              .status(400)
              .json({ error: "Invalid email, or password" });
          }

          // Login successful, generate token and set cookie
          const { userID, userRole, fName, lName } = user;

          const token = jwt.sign({ userID, userRole }, "Bhun-er", {
            expiresIn: "15d",
          });

          console.log("login success");
          res
            .cookie("jwt", token, {
              maxAge: 15 * 24 * 60 * 60 * 1000,
              httpOnly: true,
              sameSite: "none",
              secure: process.env.NODE_ENV !== "development",
            })
            .status(200)
            .json({ token, userRole, fName, lName }); // Include fName and lName in response

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
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const signup = async (req, res) => {
  try {
    const { fName, lName, email, password, address, phone, userRole } =
      req.body;
    const { dbpool, sshClient } = await connectToDatabase();

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    dbpool.getConnection(async (err, connection) => {
      if (err) {
        console.error("Error getting connection from pool:", err);
        sshClient.end();
        return;
      }

      // Check if username or email already exists
      connection.query(
        "SELECT * FROM Users WHERE Email = ?",
        [email],
        async (err, rows) => {
          if (err) throw err;

          if (rows.length > 0) {
            return res.status(400).json({ error: "Email already exists" });
          }
          const hashedPassword = await bcrypt.hash(password, 10);

          // Insert new user without specifying userID (it will auto-increment)
          const query = `
            INSERT INTO Users (fName, lName, email, password, address, phone, userRole) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `;
          const values = [
            fName,
            lName,
            email,
            hashedPassword,
            address,
            phone,
            userRole,
          ];

          connection.query(query, values, (err, result) => {
            //connection.release(); // Release the connection back to the pool

            if (err) {
              console.error("Error executing query:", err);
              connection.release(); // Ensure connection is released on error
              sshClient.end();
              return res.status(500).json({ error: "Query execution failed" });
            }

            res.status(201).json({ message: "User registered successfully" });
            connection.release(); // Release the connection back to the pool
            sshClient.end();
            console.log("Connections closed.");
          });
        }
      );
    });
  } catch (error) {
    console.log("Error in register controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
