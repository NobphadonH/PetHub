import { connectToDatabase } from "../utils/dbConnection.js";
import { updatePayment } from "./payment.controller.js";
import {
  uploadFileToS3,
  downloadFileFromS3,
  deleteFileFromS3,
} from "../utils/s3FileTransfer.js";

export const createBooking = async (req, res) => {
  try {
    const { petID, roomTypeID, checkInDate, checkOutDate, bookingDetail } = req.body;
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
          INSERT INTO Bookings (userID, petID, roomTypeID, checkInDate, checkOutDate, bookingStatus, bookingDate, bookingDetail)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const bookingValues = [
          userID,
          petID,
          roomTypeID,
          checkInDate,
          checkOutDate,
          bookingStatus,
          bookingDate,
          bookingDetail
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

export const getBookingStatusbyUserID = async (req, res) => {
  try {
    // Connect to the database and SSH client
    const { dbpool, sshClient } = await connectToDatabase();
    // Extract userID from the request body
    const userID = req.user.userID;

    // Get a connection from the database pool
    dbpool.getConnection((err, connection) => {
        if (err) {
            // Log error and close SSH if connection fails
            console.error("Error getting connection:", err);
            sshClient.end();
            return res.status(500).json({ error: "Database connection failed" });
        }

        // Query to fetch user data by userID
        const query = `SELECT B.bookingID, 
                              B.roomTypeID,
                              B.checkInDate,
                              B.checkOutDate,
                              B.bookingStatus,
                              R.roomTypeName,
                              H.hotelName,
                              H.hotelAddress,
                              P.petName,
                              P.petDOB,
                              P.petDetail,
                              P.petType,
                              P.petSex,
                              P.petPhoto
                        FROM 
                          Bookings B 
                        JOIN 
                          RoomTypes R ON B.roomTypeID = R.roomTypeID 
                        JOIN 
                          Hotels H ON R.hotelID = H.hotelID
                        JOIN 
                          Users U ON B.userID = U.userID
                        JOIN 
                          Pets P ON B.petID = P.petID
                        WHERE 
                          U.userID=?;`;
        connection.query(query, [userID], async (err, results) => {
            if (err) {
                // Log error if query fails
                console.error("Query error:", err);
                return res.status(500).json({ error: "Query execution failed" });
            }
            
            const petsWithPhotos = await Promise.all(
              results.map(async (pet) => {
                try {
                  const photoData = await downloadFileFromS3(pet.petPhoto);
                  const petPhotoBuffer = photoData.Body;
                  return {
                    ...pet,
                    petPhoto: `data:${
                      photoData.ContentType
                    };base64,${petPhotoBuffer.toString("base64")}`,
                  };
                } catch (error) {
                  console.error(
                    `Failed to download photo for petID ${pet.petID}:`,
                    error
                  );
                  // If download fails, include the pet data without the photo
                  return { ...pet, petPhoto: null };
                }
              })
            );
            // Return results on success
            console.log(petsWithPhotos);
            res.status(200).json(petsWithPhotos);
  
            // Release connection and close SSH
            connection.release();
            sshClient.end();
            console.log("Connections closed.");
        });
    });
} catch (error) {
    // Log unexpected errors
    console.error("Error in getฺBookingStatusbyUserID:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
}
};
