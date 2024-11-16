import { connectToDatabase } from "../utils/dbConnection.js";

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
            SELECT roomTypeID, roomTypeName, roomCapacity, numberOfRoom, roomSize, roomDetail, 
                   petAllowedType, pricePerNight, roomPhoto
            FROM RoomTypes
            WHERE roomTypeID = ?
        `;

        // Query to get bookings associated with this room (with pet details from the booking)
        const bookingQuery = `
            SELECT 
                B.bookingID, B.checkInDate, B.checkOutDate, B.bookingStatus, B.paymentStatus, B.paymentDate,
                U.fName AS bookerFirstName, U.lName AS bookerLastName, U.phone AS bookerPhone,
                B.petID
            FROM 
                Bookings B
            JOIN 
                Users U ON B.userID = U.userID
            WHERE 
                B.roomTypeID = ?
            ORDER BY 
                B.checkInDate DESC
        `;

        // Fetch room details
        connection.query(roomQuery, [roomTypeID], (roomErr, roomResults) => {
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

// Function to update room details
export const updateRoomDetails = async (req, res) => {
    const { roomTypeID } = req.params;
    const {
        roomTypeName,
        roomSize,
        petAllowedType,
        pricePerNight,
        roomPhoto,
    } = req.body;

    try {
        const { dbpool, sshClient } = await connectToDatabase();
        const connection = await dbpool.promise().getConnection();

        try {
            // Update query
            const updateQuery = `
                UPDATE RoomTypes
                SET 
                    roomTypeName = ?,
                    roomSize = ?,
                    petAllowedType = ?,
                    pricePerNight = ?,
                    roomPhoto = ?
                WHERE 
                    roomTypeID = ?
            `;

            const [result] = await connection.query(updateQuery, [
                roomTypeName,
                roomSize,
                petAllowedType,
                pricePerNight,
                roomPhoto,
                roomTypeID,
            ]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Room not found or no changes made" });
            }

            res.status(200).json({ message: "Room details updated successfully" });
        } finally {
            connection.release();
        }
    } catch (err) {
        console.error("Error updating room details:", err);
        res.status(500).json({ message: "An error occurred while updating room details" });
    }
};