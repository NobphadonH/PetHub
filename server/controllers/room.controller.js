import { connectToDatabase } from "../utils/dbConnection.js";
import { uploadFileToS3, downloadFileFromS3 } from "../utils/s3FileTransfer.js";
import fs from 'fs'

const createOneRoom = async (room, connection) => {
    const fileName = room.image.fileName;
    const fileContent = room.image.fileContent;
    const mimetype = room.image.mimetype;

    try {
        // Step 1: Upload file to S3
        const url = await uploadFileToS3(fileName, fileContent, mimetype);

        // Step 2: Prepare SQL query
        const query = `INSERT INTO RoomTypes (roomTypeName, roomCapacity, numberOfRoom, roomSize, roomDetail, petAllowedType, 
            pricePerNight, roomPhoto, hotelID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        // Step 3: Execute SQL query using Promise
        await new Promise((resolve, reject) => {
            connection.query(
                query,
                [room.roomTypeName, room.roomCapacity, room.numberOfRoom, room.roomSize, room.roomDetail,
                room.petAllowedType, room.pricePerNight, url, room.hotelID],
                (err, result) => {
                    if (err) {
                        reject(err);  // Reject if error occurs
                    } else {
                        resolve(result); // Resolve when query is successful
                    }
                }
            );
        });

        console.log('Room created successfully.');

        // Step 4: Delete the file from the local uploads folder after upload
        const localFilePath = `uploads/${fileName}`;
        fs.unlink(localFilePath, (err) => {
            if (err) {
                console.log('Error deleting the local file:', err);
            } else {
                console.log('Local file deleted successfully.');
            }
        });


    } catch (err) {
        console.log('Error while creating room:', err);
    } finally {
        // Step 4: Ensure connection is released back to the pool
        connection.release();
    }
};

export const createRooms = async (req, res) => {
    const hotelID = req.body.hotelID;
    const rooms = req.body;
    const images = req.files;

    const parsedRooms = [];

    console.log(rooms)


    rooms.rooms.forEach((room, index) => {
        // Get room images based on the index
        const roomImages = images.filter(file => {
            return file.fieldname === `rooms[${index}][selectedImage]`;
        });

        // Prepare room data with associated images
        parsedRooms.push({
            hotelID,
            roomTypeName: room.roomTypeName,
            roomCapacity: room.roomCapacity,
            numberOfRoom: room.numberOfRoom,
            roomSize: room.roomSize,
            roomDetail: room.roomDetail,
            petAllowedType: room.petAllowedType,
            pricePerNight: room.pricePerNight,
            image: {
                fileName: roomImages[0].filename, 
                fileContent: fs.readFileSync(roomImages[0].path),    
                mimetype: roomImages[0].mimetype    
            }
         });
         console.log(roomImages);
    });

    console.log(parsedRooms);

    const {dbpool, sshClient} = await connectToDatabase();
    dbpool.getConnection(async (err, connection) => {
        if (err) {
            console.log(err)
            sshClient.end()
            return;
        }

        const roomPromises = parsedRooms.map(async (room) => {
            await createOneRoom(room, connection);
        });

        try {
            await Promise.all(roomPromises); // Ensure all rooms are created before sending the response
            res.status(200).json({ message: 'Rooms created successfully' });
        } catch (error) {
            console.error('Error creating rooms:', error);
            res.status(500).json({ message: 'Failed to create rooms' });
        } finally {
            sshClient.end(); // Ensure SSH client is closed
        }
    });
}

