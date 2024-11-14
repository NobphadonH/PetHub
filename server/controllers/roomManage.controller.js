import { connectToDatabase } from "../utils/dbConnection.js";

export const getRoomDetails = async (req, res) => {
    const { hotelID, roomTypeID } = req.params;

    const { dbpool, sshClient } = await connectToDatabase();
    dbpool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            sshClient.end();
            return res.status(500).json({ message: "Database connection failed" });
        }

        // Query to get the specific room details
        const roomQuery = `
            SELECT roomTypeID, roomTypeName, roomCapacity, numberOfRoom, roomSize, roomDetail, 
                   petAllowedType, pricePerNight, roomPhoto
            FROM RoomTypes
            WHERE roomTypeID = ? AND hotelID = ?
        `;

        // Query to get bookings associated with this room and include pet details
        const bookingQuery = `
            SELECT 
                B.bookingID, B.checkInDate, B.checkOutDate, B.paymentStatus, B.paymentDate,
                U.fName AS bookerFirstName, U.lName AS bookerLastName, U.phone AS bookerPhone,
                P.petID, P.petName, P.petDOB, P.petType, P.petDetail, P.petPhoto
            FROM 
                Bookings B
            JOIN 
                Users U ON B.userID = U.userID
            LEFT JOIN
                Pets P ON P.userID = U.userID
            WHERE 
                B.roomTypeID = ?
            ORDER BY 
                B.checkInDate DESC
        `;

        // Fetch room details
        connection.query(roomQuery, [roomTypeID, hotelID], (roomErr, roomResults) => {
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

            // Fetch associated bookings for the room with pet details
            connection.query(bookingQuery, [roomTypeID], (bookingErr, bookingResults) => {
                if (bookingErr) {
                    console.log(bookingErr);
                    res.status(500).json({ message: "Failed to fetch bookings" });
                    sshClient.end();
                    return;
                }

                const roomDetails = {
                    ...roomResults[0],
                    bookings: bookingResults
                };

                res.status(200).json(roomDetails);
                sshClient.end();
            });

            connection.release();
        });
    });
};
