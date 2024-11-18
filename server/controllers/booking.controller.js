import { connectToDatabase } from "../utils/dbConnection.js";
import { updatePayment } from "./payment.controller.js";

export const createBooking = async (req, res) => {
  try {
    const { petID, roomTypeID, checkInDate, checkOutDate } = req.body;
    const { dbpool, sshClient } = await connectToDatabase();
    const userID = req.user.userID;

    dbpool.getConnection(async (err, connection) => {
      if (err) {
        console.error("Error getting connection from pool:", err);
        sshClient.end();
        return res.status(500).json({ error: "Database connection failed" });
      }

      try {
        // Step 1: Retrieve petType and room's allowed pet type
        const petQuery = "SELECT petType FROM Pets WHERE petID = ?";
        const roomTypeQuery =
          "SELECT petAllowedType FROM RoomTypes WHERE roomTypeID = ?";

        const petResult = await new Promise((resolve, reject) => {
          connection.query(petQuery, [petID], (err, results) => {
            if (err) reject(err);
            else resolve(results[0]);
          });
        });

        const roomTypeResult = await new Promise((resolve, reject) => {
          connection.query(roomTypeQuery, [roomTypeID], (err, results) => {
            if (err) reject(err);
            else resolve(results[0]);
          });
        });

        // Check if the pet type is allowed in the room type
        let bookingStatus = "Pending";
        if (
          petResult &&
          roomTypeResult &&
          (petResult.petType === roomTypeResult.petAllowedType ||
            (petResult.petType === "อื่นๆ" &&
              roomTypeResult.petAllowedType === "อื่นๆ"))
        ) {
          bookingStatus = "Confirmed";
        }

        // Step 2: Insert booking details into the Bookings table
        const bookingDate = new Date(); // Current timestamp
        const bookingQuery = `
          INSERT INTO Bookings (userID, petID, roomTypeID, checkInDate, checkOutDate, bookingStatus, bookingDate)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const bookingValues = [
          userID,
          petID,
          roomTypeID,
          checkInDate,
          checkOutDate,
          bookingStatus,
          bookingDate,
        ];

        connection.query(bookingQuery, bookingValues, (err, result) => {
          connection.release(); // Release the connection back to the pool
          sshClient.end();

          if (err) {
            console.error("Error executing booking query:", err);
            return res.status(500).json({ error: "Booking creation failed" });
          }

          res.status(201).json({
            message: "Booking created successfully",
            bookingID: result.insertId,
            bookingStatus,
            bookingDate,
          });
        });
      } catch (error) {
        console.error("Error in createBooking process:", error);
        connection.release();
        sshClient.end();
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  } catch (error) {
    console.error("Error in createBooking controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { bookingID } = req.body; // Assume bookingID is sent in the request body
    const { dbpool, sshClient } = await connectToDatabase();

    dbpool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting connection from pool:", err);
        sshClient.end();
        return res.status(500).json({ error: "Database connection failed" });
      }

      const updateQuery = `
        UPDATE Bookings
        SET bookingStatus = 'Cancelled'
        WHERE bookingID = ?
      `;

      connection.query(updateQuery, [bookingID], async (err, result) => {
        connection.release(); // Release the connection back to the pool
        sshClient.end();

        if (err) {
          console.error("Error updating booking status:", err);
          return res.status(500).json({ error: "Failed to cancel booking" });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ error: "Booking not found" });
        }

        // Call updatePayment to update payment status to 'Refunded'
        const paymentUpdateResult = await updatePayment(bookingID, "Cancelled");
        if (!paymentUpdateResult.success) {
          return res
            .status(500)
            .json({ error: "Failed to update payment status" });
        }

        res.status(200).json({
          message: "Booking and payment cancelled successfully",
          bookingID,
        });
      });
    });
  } catch (error) {
    console.error("Error in cancelBooking controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const { bookingID } = req.body; // Assume bookingID is sent in the request body
    const { dbpool, sshClient } = await connectToDatabase();

    dbpool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting connection from pool:", err);
        sshClient.end();
        return res.status(500).json({ error: "Database connection failed" });
      }

      const updateQuery = `
        UPDATE Bookings
        SET bookingStatus = 'Confirmed'
        WHERE bookingID = ? AND bookingStatus = 'Pending'
      `;

      connection.query(updateQuery, [bookingID], async (err, result) => {
        connection.release(); // Release the connection back to the pool
        sshClient.end();

        if (err) {
          console.error("Error updating booking status:", err);
          return res.status(500).json({ error: "Failed to confirm booking" });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({
            error: "Booking not found or already confirmed",
          });
        }

        // Call updatePayment to update payment status to 'Paid'
        const paymentUpdateResult = await updatePayment(bookingID, "Paid");
        if (!paymentUpdateResult.success) {
          return res
            .status(500)
            .json({ error: "Failed to update payment status" });
        }

        res.status(200).json({
          message: "Booking confirmed and payment status updated successfully",
          bookingID,
        });
      });
    });
  } catch (error) {
    console.error("Error in updateBooking controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
