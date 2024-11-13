import { connectToDatabase } from "../utils/dbConnection.js";

export const getHotelProfile = async (req, res) => {
    const hotelID = req.params.hotelID;
    
    const { dbpool, sshClient } = await connectToDatabase();
    dbpool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            sshClient.end();
            res.status(500).json({ message: "Database connection failed" });
            return;
        }

        const hotelQuery = `SELECT hotelID, hotelName, hotelType, hotelDescription, hotelPolicy, hotelAddress FROM Hotels WHERE hotelID = ?`;
        const roomQuery = `SELECT roomTypeID, roomTypeName, roomCapacity, numberOfRoom, roomSize, roomDetail, petAllowedType, pricePerNight, roomPhoto FROM RoomTypes WHERE hotelID = ?`;
        const bookingQuery = `
            SELECT 
                B.bookingID, B.checkInDate, B.paymentDate, B.roomTypeID, B.paymentStatus 
            FROM 
                Bookings B
            JOIN 
                RoomTypes R ON B.roomTypeID = R.roomTypeID
            WHERE 
                R.hotelID = ?
            ORDER BY 
                B.checkInDate DESC
        `;

        connection.query(hotelQuery, [hotelID], (hotelErr, hotelResult) => {
            if (hotelErr) {
                console.log(hotelErr);
                res.status(500).json({ message: "Failed to fetch hotel profile" });
                sshClient.end();
                return;
            }

            if (hotelResult.length === 0) {
                res.status(404).json({ message: "Hotel not found" });
                sshClient.end();
                return;
            }

            // Fetch associated room types
            connection.query(roomQuery, [hotelID], (roomErr, roomResults) => {
                if (roomErr) {
                    console.log(roomErr);
                    res.status(500).json({ message: "Failed to fetch room types" });
                    sshClient.end();
                    return;
                }

                // Fetch booking history
                connection.query(bookingQuery, [hotelID], (bookingErr, bookingResults) => {
                    if (bookingErr) {
                        console.log(bookingErr);
                        res.status(500).json({ message: "Failed to fetch booking history" });
                    } else {
                        const hotelProfile = {
                            ...hotelResult[0],
                            rooms: roomResults,
                            bookings: bookingResults // Add booking history to the response
                        };
                        res.status(200).json(hotelProfile);
                    }
                    sshClient.end();
                });
            });

            connection.release();
        });
    });
};
