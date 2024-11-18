import { sshConfig } from "../config/sshConfig.js";
import { connectToDatabase } from "../utils/dbConnection.js";
import bcrypt from "bcrypt";

export const createPayment = async (req, res) => {
  const { bookingID, amount, petAllowedType } = req.body;
  const userID = req.user.userID;

  const { dbpool, sshClient } = await connectToDatabase();

  const token = await bcrypt.hash("userID" + "bookingID", 10);

  let query = `INSERT INTO Payments (bookingID, amount, paymentMethod, paymentToken, paymentStatus, paymentDate)
    VALUES (?, ?, ?, ?, ?, ?)`;

  const values = [bookingID, amount, "Credit/Debit Card", token];

  if (petAllowedType == "อื่น ๆ") {
    values.push("Pending");
    query = `INSERT INTO Payments (bookingID, amount, paymentMethod, paymentToken, paymentStatus)
        VALUES (?, ?, ?, ?, ?)`;
  } else {
    const paymentDate = new Date();
    values.push("Paid");
    values.push(paymentDate);
  }

  dbpool.getConnection(async (err, connection) => {
    if (err) {
      console.error("Error getting connection from pool:", err);
      sshClient.end();
      return res.status(500).json({ error: "Database connection failed" });
    }

    connection.query(query, values, (err, result) => {
      if (err) {
        console.error("Error executing booking query:", err);
        sshConfig.end();
        return res.status(500).json({ error: "Booking creation failed" });
      }

      res.status(201).json({
        message: "payment create successfully",
        paymentID: result.insertId,
      });
    });
  });
};

// export const updatePayment = async (paymentID, status) => {
//   const { dbpool, sshClient } = await connectToDatabase();

//   try {
//     dbpool.getConnection(async (err, connection) => {
//       let query = `UPDATE Payments SET paymentStatus = Paid, paymentDate = ? WHERE paymentID = ?`;
//       const paymentDate = new Date();
//       let values = [paymentDate, paymentID];

//       if (status != "Paid") {
//         query = `UPDATE Payments SET paymentStatus = Cancelled WHERE paymentID = ?`;
//         values = [paymentID];
//       }

//       connection.query(query, values, (err, result) => {
//         if (err) {
//           console.error("Error executing booking query:", err);
//           sshConfig.end();
//         }

//         return { sucess: true };
//       });
//     });
//   } catch (err) {
//     console.error("Error update payment record");
//     return { success: false, error: "Payment update failed" };
//   }
// };

export const updatePayment = async (bookingID, status) => {
  const { dbpool, sshClient } = await connectToDatabase();

  return new Promise((resolve, reject) => {
    dbpool.getConnection(async (err, connection) => {
      if (err) {
        console.error("Error getting connection from pool:", err);
        sshClient.end();
        return reject({ success: false, error: "Database connection failed" });
      }

      let query = `UPDATE Payments SET paymentStatus = ?, paymentDate = ? WHERE bookingID = ?`;
      const paymentDate = new Date();
      let values = [status, paymentDate, bookingID];

      if (status !== "Paid") {
        query = `UPDATE Payments SET paymentStatus = ? WHERE bookingID = ?`;
        values = [status, bookingID];
      }

      connection.query(query, values, (err, result) => {
        connection.release(); // Release the connection back to the pool
        sshClient.end();

        if (err) {
          console.error("Error updating payment status:", err);
          return reject({ success: false, error: "Payment update failed" });
        }

        resolve({ success: true });
      });
    });
  });
};
