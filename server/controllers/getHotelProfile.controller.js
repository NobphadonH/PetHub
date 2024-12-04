import { connectToDatabase } from "../utils/dbConnection.js";
import { downloadFileFromS3 } from "../utils/s3FileTransfer.js";

export const getHotelProfile = async (req, res) => {
    const { fName, lName } = req.params;
    const userID = req.user.userID;

    if (!fName || !lName || !userID) {
        return res.status(400).json({ error: "Missing user information in cookies" });
    }

    const { dbpool, sshClient } = await connectToDatabase();
    dbpool.getConnection(async (err, connection) => {
        if (err) {
            sshClient.end();
            return res.status(500).json({ message: "Database connection failed" });
        }

        try {
            const hotelQuery = `
                SELECT 
                    H.hotelID, H.hotelName, H.hotelType, H.hotelDescription, H.hotelPhoto,
                    H.hotelPolicy, H.hotelAddress, H.verification,
                    U.fName, U.lName, U.phone
                FROM 
                    Hotels H
                JOIN 
                    Users U ON H.userID = U.userID
                WHERE 
                    U.userID = ? ;
            `;

            const roomQuery = `
                SELECT roomTypeID, roomTypeName, roomCapacity, numberOfRoom, roomSize, roomDetail, petAllowedType, pricePerNight, roomPhoto 
                FROM RoomTypes
                WHERE hotelID = ?`;
            
            const bookingQuery = `
            SELECT 
            B.bookingID, B.checkInDate, B.checkOutDate, B.bookingStatus, B.roomTypeID,
            P.paymentStatus, P.paymentDate, R.roomTypeName,
            U.fName AS bookerFirstName, U.lName AS bookerLastName, U.phone AS bookerPhone
            FROM 
                Bookings B
            JOIN 
                RoomTypes R ON B.roomTypeID = R.roomTypeID
            JOIN 
                Users U ON B.userID = U.userID
            LEFT JOIN 
                Payments P ON B.bookingID = P.bookingID
            WHERE 
                R.hotelID = ?
            ORDER BY 
                B.bookingID DESC;
            `;

            const hotelResult = await new Promise((resolve, reject) => {
                connection.query(hotelQuery, [userID], (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
            });

            if (hotelResult.length === 0) {
                return res.status(404).json({ message: "Hotel not found" });
            }

            const hotelID = hotelResult[0].hotelID;

            // Download the hotel photo and encode to base64
            const hotelPhotoKey = hotelResult[0].hotelPhoto;
            const hotelPhotoData = await downloadFileFromS3(hotelPhotoKey);
            const hotelPhotoBuffer = hotelPhotoData.Body;
            const hotelPhotoFile = `data:${hotelPhotoData.ContentType};base64,${hotelPhotoBuffer.toString("base64")}`;
            hotelResult[0].hotelPhoto = hotelPhotoFile; // Add base64 encoded photo to hotel result

            const roomResults = await new Promise((resolve, reject) => {
                connection.query(roomQuery, [hotelID], (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
            });

            for (const rooms of roomResults) {
                const imageKey = rooms.roomPhoto;

                const photoData = await downloadFileFromS3(imageKey);
                const roomPhotoBuffer = photoData.Body;
                const roomPhotoFile = `data:${
                    photoData.ContentType
                };base64,${roomPhotoBuffer.toString("base64")}`;
                rooms.roomPhoto = roomPhotoFile;
            }

            const bookingResults = await new Promise((resolve, reject) => {
                connection.query(bookingQuery, [hotelID], (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
            });

            const hotelProfile = {
                ...hotelResult[0],
                rooms: roomResults,
                bookings: bookingResults,
            };

            res.status(200).json(hotelProfile);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to fetch hotel profile" });
        } finally {
            connection.release();
            sshClient.end();
        }
    });
};

// Update Hotel Profile by fName and lName
export const updateHotelProfile = async (req, res) => {
    const { fName, lName } = req.params;
    const { content1, content2 } = req.body;

    if (!content1 || !content2) {
        return res.status(400).json({ message: "Missing description or policy content" });
    }

    const hotelDescription = content1;
    const hotelPolicy = content2;

    try {
        const { dbpool, sshClient } = await connectToDatabase();

        dbpool.getConnection((err, connection) => {
            if (err) {
                console.error(err);
                sshClient.end();
                return res.status(500).json({ message: "Database connection failed" });
            }

            console.log("Request Body:", req.body);
            console.log("Request cookie:", req.params);
            console.log("Description:", hotelDescription);
            console.log("Policy:", hotelPolicy);

            // Query to get hotelID based on fName and lName
            const getHotelIDQuery = `
                SELECT H.hotelID 
                FROM Hotels H
                JOIN Users U ON U.userID = H.userID
                WHERE U.fName = ? AND U.lName = ?
            `;

            connection.query(getHotelIDQuery, [fName, lName], (getErr, rows) => {
                if (getErr) {
                    console.error(getErr);
                    res.status(500).json({ message: "Failed to fetch hotel ID" });
                    sshClient.end();
                    connection.release();
                    return;
                }

                console.log("Fetched Rows:", rows);

                if (rows.length === 0) {
                    res.status(404).json({ message: "User or associated hotel not found" });
                    sshClient.end();
                    connection.release();
                    return;
                }

                const hotelID = rows[0].hotelID;

                // Query to update hotel description and policy
                const updateQuery = `
                    UPDATE Hotels 
                    SET hotelDescription = ?, hotelPolicy = ?
                    WHERE hotelID = ?
                `;

                connection.query(updateQuery, [hotelDescription, hotelPolicy, hotelID], (updateErr, result) => {
                    if (updateErr) {
                        console.error(updateErr);
                        res.status(500).json({ message: "Failed to update hotel profile" });
                        sshClient.end();
                        connection.release();
                        return;
                    }

                    console.log("Update Query Result:", result);

                    if (result.affectedRows === 0) {
                        res.status(404).json({ message: "Hotel not found" });
                    } else {
                        res.status(200).json({ message: "Hotel profile updated successfully" });
                    }

                    sshClient.end();
                    connection.release();
                });
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An unexpected error occurred" });
    }
};