import { connectToDatabase } from "../utils/dbConnection.js";
import { uploadFileToS3, downloadFileFromS3 } from "../utils/s3FileTransfer.js";
import fs from 'fs'

const createOneRoom = async (room, connection) => {
    const fileName = room.images.filename
    const fileContent = room.images.buffer
    const mimetype = room.images.mimetype

    try{
        const url = await uploadFileToS3(fileName, fileContent, mimetype)
        const query = `INSERT INTO RoomTypes (roomTypeName, roomCapacity, numberOfRoom, roomSize, roomDetail, petAllowedType, 
        pricePerNight, roomPhoto, hotelID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`

        connection.query(
            query,
            [room.roomTypeName, room.roomTypeCapacity, room.numberOfRoom, room.roomSize, room.roomDetail, 
                room.petAllowedType, room.pricePerNight, url, room.hotelID],
            (err, result) => {
                if (err) {
                    if (err) {
                        console.log(err)
                        return;
                    }
                    console.log(result);
                }
            }
        )


    } catch (err) {
        console.log(err);
    }


}

export const createRooms = async (req, res) => {
    const hotelID = req.body.hotelID;
    const rooms = req.body;
    images = req.files;

    const parsedRooms = [];

    Object.keys(rooms).forEach((key) => {
        if (key.startsWith("rooms")) {
            const [_, index, fieldName] = key.match(/rooms\[(\d+)\]\[([^\]]+)\]/);
            if (!parsedRooms[index]) {
                parsedRooms[index] = { images: [] };
            }
            if (parsedRooms !== 'selectedImage') {
                parsedRooms[index][fieldName] = rooms[key];
            }
        }
    });
    
    const {dbpool, sshClient} = await connectToDatabase();
    dbpool.getConnection(async (err, connection) => {
        if (err) {
            console.log(err)
            sshClient.end()
            return;
        }

        const roomPromises = parsedRooms.map(async (room) => {
            // Assuming room.images contains an array of images
            const roomImages = room.images;
            // You would handle uploading all images before creating the room
            if (roomImages.length > 0) {
                await createOneRoom(room, connection);
            }
        });

        try {
            await Promise.all(roomPromises); // Ensure all rooms are created before sending the response
            res.status(200).json({ message: 'Rooms created successfully' });
        } catch (error) {
            console.error('Error creating rooms:', error);
            res.status(500).json({ message: 'Failed to create rooms' });
        } finally {
            connection.release(); // Release the connection back to the pool
            sshClient.end(); // Ensure SSH client is closed
        }
    });

}

