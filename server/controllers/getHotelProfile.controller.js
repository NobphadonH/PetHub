import { connectToDatabase } from "../utils/dbConnection.js";
import { downloadFileFromS3 } from "../utils/s3FileTransfer.js";

export const getHotelProfile = async (req, res) => {
    const { fName, lName } = req.params;

    if (!fName || !lName) {
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
                    H.hotelPolicy, H.hotelAddress,
                    U.fName, U.lName, U.phone
                FROM 
                    Hotels H
                JOIN 
                    Users U ON H.userID = U.userID
                WHERE 
                    U.fName = ? AND U.lName = ?;
            `;

            const roomQuery = `
                SELECT roomTypeID, roomTypeName, roomCapacity, numberOfRoom, roomSize, roomDetail, petAllowedType, pricePerNight, roomPhoto 
                FROM RoomTypes
                WHERE hotelID = ?`;

            const hotelResult = await new Promise((resolve, reject) => {
                connection.query(hotelQuery, [fName, lName], (err, results) => {
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

            const hotelProfile = {
                ...hotelResult[0],
                rooms: roomResults,
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

// // Update Hotel Profile
// export const updateHotelProfile = async (req, res) => {
//     const hotelID = req.params.hotelID;
//     const { hotelDescription, hotelPolicy } = req.body; // Get the new description and policy from the request body
    
//     const { dbpool, sshClient } = await connectToDatabase();
//     dbpool.getConnection((err, connection) => {
//         if (err) {
//             console.log(err);
//             sshClient.end();
//             return res.status(500).json({ message: "Database connection failed" });
//         }

//         // Query to update hotel description and policy
//         const updateQuery = `
//             UPDATE Hotels 
//             SET hotelDescription = ?, hotelPolicy = ?
//             WHERE hotelID = ?
//         `;

//         connection.query(updateQuery, [hotelDescription, hotelPolicy, hotelID], (queryErr, result) => {
//             if (queryErr) {
//                 console.log(queryErr);
//                 res.status(500).json({ message: "Failed to update hotel profile" });
//                 sshClient.end();
//                 return;
//             }

//             if (result.affectedRows === 0) {
//                 res.status(404).json({ message: "Hotel not found" });
//             } else {
//                 res.status(200).json({ message: "Hotel profile updated successfully" });
//             }

//             sshClient.end();
//             connection.release();
//         });
//     });
// };