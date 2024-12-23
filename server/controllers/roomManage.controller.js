import { connectToDatabase } from "../utils/dbConnection.js";
import {
    uploadFileToS3,
    downloadFileFromS3,
    deleteFileFromS3,
  } from "../utils/s3FileTransfer.js";
import fs from "fs";


//function for fetching details
export const getRoomDetails = async (req, res) => {
    const { roomTypeID } = req.params;

    const { dbpool, sshClient } = await connectToDatabase();
    dbpool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            sshClient.end();
            return res.status(500).json({ message: "Database connection failed" });
        }

        // Query to get the specific room details
        const roomQuery = `
            SELECT roomTypeID, hotelID, roomTypeName, roomCapacity, numberOfRoom, roomSize, roomDetail, 
                   petAllowedType, pricePerNight, roomPhoto
            FROM RoomTypes
            WHERE roomTypeID = ?
        `;

        // Query to get bookings associated with this room (with pet details from the booking)
        const bookingQuery = `
            SELECT 
                B.bookingID, B.checkInDate, B.checkOutDate, B.bookingStatus, P.paymentStatus, P.paymentDate,
                U.fName AS bookerFirstName, U.lName AS bookerLastName, U.phone AS bookerPhone,
                B.petID
            FROM 
                Bookings B
            JOIN 
                Users U ON B.userID = U.userID
            LEFT JOIN 
                Payments P ON B.bookingID = P.bookingID
            WHERE 
                B.roomTypeID = ?
            ORDER BY 
                B.bookingID DESC
        `;

        // Fetch room details
        connection.query(roomQuery, [roomTypeID], async (roomErr, roomResults) => {
            if (roomErr) {
                console.log(roomErr);
                res.status(500).json({ message: "Failed to fetch room details" });
                sshClient.end();
                return;
            }

            if (roomResults.length === 0) {
                res.status(404).json({ message: "Room not found" });
                sshClient.end();
                return;
            }

            // Fetch and convert the roomPhoto to base64
            try {
                const roomPhotoKey = roomResults[0].roomPhoto;
                const roomPhotoData = await downloadFileFromS3(roomPhotoKey);
                const roomPhotoBuffer = roomPhotoData.Body;
                const roomPhotoBase64 = `data:${roomPhotoData.ContentType};base64,${roomPhotoBuffer.toString("base64")}`;
                roomResults[0].roomPhoto = roomPhotoBase64; // Replace the key with base64 image
            } catch (s3Error) {
                console.error("Failed to fetch room photo from S3:", s3Error);
                roomResults[0].roomPhoto = null; // Set to null if fetching the image fails
            }

            // Fetch bookings associated with the room
            connection.query(bookingQuery, [roomTypeID], async (bookingErr, bookingResults) => {
                if (bookingErr) {
                    console.log(bookingErr);
                    res.status(500).json({ message: "Failed to fetch bookings" });
                    sshClient.end();
                    return;
                }

                if (bookingResults.length > 0) {
                // For each booking, fetch the associated pet
                const bookingsWithPets = [];

                for (let booking of bookingResults) {
                    const petQuery = `
                        SELECT 
                            P.petID, P.petName, P.petDOB, P.petType, P.petDetail, P.petPhoto, P.petSex
                        FROM 
                            Pets P
                        WHERE 
                            P.petID = ?  -- Match the petID from the booking
                    `;

                    // Fetch the pet associated with this booking
                    const [petResults] = await connection.promise().query(petQuery, [booking.petID]);

                    // Convert petPhoto to base64 for each pet
                    for (let pet of petResults) {
                        try {
                            const petPhotoKey = pet.petPhoto;
                            const petPhotoData = await downloadFileFromS3(petPhotoKey);
                            const petPhotoBuffer = petPhotoData.Body;
                            const petPhotoBase64 = `data:${petPhotoData.ContentType};base64,${petPhotoBuffer.toString("base64")}`;
                            pet.petPhoto = petPhotoBase64;
                        } catch (s3Error) {
                            console.error("Failed to fetch pet photo from S3:", s3Error);
                            pet.petPhoto = null;
                        }
                    }

                    // Add pet to the booking
                    bookingsWithPets.push({
                        ...booking,
                        pets: petResults
                    });
                }

                const roomDetails = {
                    ...roomResults[0],
                    bookings: bookingsWithPets
                };

                res.status(200).json(roomDetails);
            } else {
                // No bookings for this room
                const roomDetails = {
                    ...roomResults[0],
                    bookings: [] // Return an empty bookings array
                    };
            res.status(200).json(roomDetails);
                }
                sshClient.end();
            });
            connection.release();
        });
    });
};

export const updateBookingStatus = async (req, res) => {
    const { bookingID } = req.params; // Get the booking ID from the URL
    const { status } = req.body; // Get the new status from the request body
    
    try {
        const { dbpool, sshClient } = await connectToDatabase();
        const connection = await dbpool.promise().getConnection();

        try {
            // Update the booking status in the database
            const [result] = await connection.query(
                `UPDATE Bookings SET bookingStatus = ? WHERE bookingID = ?`,
                [status, bookingID]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Booking not found." });
            }

            res.status(200).json({ message: `Booking ${bookingID} status updated to ${status}.` });
            console.log(`Received status: ${status} for bookingID: ${bookingID}`);
        } finally {
            connection.release();
        }
        sshClient.end();
    } catch (error) {
        console.error("Error updating booking status:", error);
        res.status(500).json({ message: "Failed to update booking status.", error });
    }
};

export const updateRoom  = async (req, res) => {
    console.log("abcd");
    try {
        const {roomTypeID, roomTypeName, numberOfRoom, roomSize, roomDetail, petAllowedType, pricePerNight} = req.body;
        const { dbpool, sshClient } = await connectToDatabase();

        console.log(req.body);

        const updates = [];
        const values = [];

        if (roomTypeName) {
            updates.push("roomTypeName = ?");
            values.push(roomTypeName);
          }
          if (numberOfRoom) {
            updates.push("numberOfRoom = ?");
            values.push(numberOfRoom);
          }
          if (roomSize) {
            updates.push("roomSize = ?");
            values.push(roomSize);
          }
          if (roomDetail) {
            updates.push(" roomDetail = ?");
            values.push(roomDetail);
          }
          if (petAllowedType) {
            updates.push(" petAllowedType = ?");
            values.push(petAllowedType);
          }
          if (pricePerNight) {
            updates.push(" pricePerNight = ?");
            values.push(pricePerNight);
          }

          dbpool.getConnection((err, connection) => {
            if (err) {
                console.error("Error getting connection from pool:", err);
                sshClient.end()
                return res.status(500).json({ error: "Database connection failed" });
            }
            if (req.file) {
                console.log("file deteced");
                connection.query(
                    `SELECT roomPhoto FROM RoomTypes WHERE roomTypeID = ?`,
                    [roomTypeID],
                    async (err, results) => {
                      if (err) {
                        console.error("Error fetching room photo:", err);
                        connection.release();
                        sshClient.end();
                        return res
                          .status(500)
                          .json({ error: "Failed to retrieve room photo" });
                      }
          
                      const currentPhotoUrl = results[0]?.roomPhoto;
                      if (currentPhotoUrl) {
                        await deleteFileFromS3(currentPhotoUrl); // Delete the old file from S3
                      }
          
                      // Upload the new image to S3
                      const filePath = req.file.path;
                      const fileName = req.file.filename;
                      const fileContent = fs.readFileSync(filePath);
                      const fileMimeType = req.file.mimetype;
                      const newPhotoUrl = await uploadFileToS3(
                        fileName,
                        fileContent,
                        fileMimeType
                      );
          
                      // Add new photo URL to the update query
                      updates.push("roomPhoto = ?");
                      values.push(newPhotoUrl);

                      values.push(roomTypeID);
                      const query = `UPDATE RoomTypes SET ${updates.join(", ")} WHERE roomTypeID = ?`
                      connection.query(query, values, (err, result) => {
                        if (err) {
                            console.error("Error updating room:", err);
                            connection.release();
                            sshClient.end();
                            return res
                              .status(500)
                              .json({ error: "Failed to update room information" });
                        }
        
                        res.status(200).json({message: "Room updated successfully"})
                        connection.release();
                        sshClient.end();
                    })

                    }
                  );
            }


          })

          
        // values.push(roomTypeID);
        // const query = `UPDATE RoomTypes SET ${updates.join(", ")} WHERE roomTypeID = ?`
        // dbpool.getConnection((err, connection) => {
        //     if (err) {
        //         console.error("Error getting connection from pool:", err);
        //         sshClient.end();
        //         return res.status(500).json({ error: "Database connection failed" });
        //     }
        //     connection.query(query, values, (err, result) => {
        //         if (err) {
        //             console.error("Error updating room:", err);
        //             connection.release();
        //             sshClient.end();
        //             return res
        //               .status(500)
        //               .json({ error: "Failed to update room information" });
        //         }

        //         res.status(200).json({message: "Room updated successfully"})
        //         connection.release();
        //         sshClient.end();
        //     })
        // })
          

    } catch (error) {
        console.log("Error in updateRoom:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
}
