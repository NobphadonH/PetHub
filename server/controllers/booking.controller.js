import { connectToDatabase } from "../utils/dbConnection.js";

export const createBooking = async (req, res) => {
  try {
    const { userID, petID, roomTypeID, checkInDate, checkOutDate } = req.body;

    const { dbpool, sshClient } = await connectToDatabase();

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
          "SELECT petAllowedType, pricePerNight FROM RoomTypes WHERE roomTypeID = ?";

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

        // Calculate number of nights between checkInDate and checkOutDate
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

        // Calculate amounts based on pricePerNight
        const pricePerNight = roomTypeResult.pricePerNight;
        const amounts = pricePerNight * nights;

        // Check if the pet type is allowed in the room type
        let bookingStatus = "pending";
        let paymentDate = null;
        let paymentStatus = "unpaid";

        if (
          petResult &&
          roomTypeResult &&
          petResult.petType === roomTypeResult.petAllowedType
        ) {
          // Additional check: If petType is "อื่นๆ", set status to "pending"
          if (
            petResult.petType === "อื่นๆ" &&
            roomTypeResult.petAllowedType === "อื่นๆ"
          ) {
            bookingStatus = "pending";
          } else {
            bookingStatus = "confirmed";
            paymentDate = new Date(); // Set paymentDate to current date and time
            paymentStatus = "paid";
          }
        }

        // Step 2: Insert booking details into the Bookings table
        const bookingQuery = `
          INSERT INTO Bookings (userID, petID, roomTypeID, checkInDate, checkOutDate, bookingStatus, paymentDate, amounts, paymentStatus)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const bookingValues = [
          userID,
          petID,
          roomTypeID,
          checkInDate,
          checkOutDate,
          bookingStatus,
          paymentDate,
          amounts,
          paymentStatus,
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
            paymentStatus,
            amounts,
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
