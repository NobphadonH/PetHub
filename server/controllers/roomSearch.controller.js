import { connectToDatabase } from "../utils/dbConnection.js";
import { uploadFileToS3, downloadFileFromS3 } from "../utils/s3FileTransfer.js";
import fs from 'fs'

export const getHotelAndRoomByFilter = async (req, res) => {
    try {
        const {petType, district, checkIn, checkOut, hotelName, priceRangeLower, priceRangeUpper} = req.body;
        const { dbpool, sshClient } = await connectToDatabase();
        dbpool.getConnection(async (err, connection) => {
            if (err) {
                console.error("Error getting connection from pool:", err);
                sshClient.end();
                return;
            }

            const values = []
            const filter = []

            if (district) {
                filter.push("h.district = ?");
                values.push(district);
            }
            
            if (petType) {
                filter.push("r.petAllowedType = ?");
                values.push(petType);
            }
            
            if (priceRangeLower && priceRangeUpper) {
                filter.push("r.price BETWEEN ? AND ?");
                values.push(priceRangeLower, priceRangeUpper);
            }
            
            if (hotelName) {
                filter.push("h.hotelName LIKE ?");
                const hotelLike = '%' + hotelName + '%';
                values.push(hotelLike);
            }
            
            const query = `
                SELECT * 
                FROM Hotels h
                JOIN RoomTypes r ON h.hotelID = r.hotelID
                WHERE h.verification = "verified"
                ${filter.length > 0 ? 'AND ' + filter.join(' AND ') : ''}
            `;

            
            connection.query(
                query,
                values,
                async (err, rows) =>  {
                    if (err) {
                        console.log(err);
                        sshClient.end()
                        return;
                    }

                    const allRooms = rows;
                    let roomResult = [];

                    allRooms.forEach(room => {
                        const roomID = room.roomTypeID
                        const numberOfRoom = room.numberOfRoom
                        let isAvailable = 1;
                        const bookingQuery = `SELECT * FROM Bookings WHERE roomTypeID = ? AND checkInDate < ? AND checkOutDate > ? ORDER BY checkInDate ASC`
                        connection.query(
                            bookingQuery,
                            [roomID, checkIn, checkOut],
                            (err, rows) => {
                                if (err) {
                                    console.log(err);
                                    sshClient.end();
                                    return; 
                                }

                                const bookings = rows;
                                let checkOutDateQueue = [];
                                bookings.forEach(record => {
                                    const recordCheckOut = new Date(record.checkOutDate);
                                    checkOutDateQueue.push(recordCheckOut)
                                })

                                checkOutDateQueue.sort((a, b) => a - b)

                                let i=0;
                                let numberOfRoomOccupied = 0 
                                

                                bookings.forEach(record => {
                                    const recordCheckIn = new Date(record.checkInDate)
                                    numberOfRoomOccupied++;
                                    while (checkOutDateQueue[i]  && checkOutDateQueue[i] < recordCheckIn) {
                                        numberOfRoomOccupied--;
                                        i++;
                                    }   
                                    if (numberOfRoomOccupied >= numberOfRoom) {
                                        isAvailable = 0;
                                    }
                                })

                            }
                        )
                        if (isAvailable) {
                            roomResult.push(room);
                        }

                    })

                    for (let room of roomResult) {
                        const imageKey = room.hotelPhoto;

                        const photoData = await downloadFileFromS3(imageKey);
                        const roomPhotoBuffer = photoData.Body;
                        const roomPhotoFile = `data:${photoData.ContentType};base64,${roomPhotoBuffer.toString('base64')}`;
                        
                        room.roomPhoto = roomPhotoFile;
                    }

                    let availableHotelWithRoomResult = roomResult
                    .map(room => ({
                        hotelID: room.hotelID,
                        hotelName: room.hotelName,
                        hotelType: room.hotelType,
                        hotelDescription: room.hotelDescription,
                        hotelPolicy: room.hotelPolicy,
                        hotelAddress: room.hotelAddress,
                        mapLat: room.mapLat,
                        matLong: room.mapLong,
                        hotelPhoto: room.hotelPhoto,
                        district: room.district,
                        roomsAvailable: []
                    }))
                    .filter((value, index, self) =>
                        index === self.findIndex((t) => (
                            t.hotelID === value.hotelID
                        ))
                    );


                    for (let hotelData of availableHotelWithRoomResult) {
                        const imageKey = hotelData.hotelPhoto;

                        const photoData = await downloadFileFromS3(imageKey);
                        const hotelPhotoBuffer = photoData.Body;
                        const hotelPhotoFile = `data:${photoData.ContentType};base64,${hotelPhotoBuffer.toString('base64')}`;
                        
                        hotelData.hotelPhoto = hotelPhotoFile;
                    }

                    availableHotelWithRoomResult.forEach(hotel => {
                        roomResult.forEach(room => {
                            if (hotel.hotelID === room.hotelID) {
                                hotel.roomsAvailable.push({
                                    roomTypeID: room.roomTypeID,
                                    roomTypeName: room.roomTypeName,
                                    roomCapacity: room.roomCapacity,
                                    roomSize: room.roomSize,
                                    roomDetail: room.roomDetail,
                                    roomSize: room.roomSize,
                                    petAllowedType: room.petAllowedType,
                                    pricePerNight: room.pricePerNight,
                                    roomPhoto: room.roomPhoto,
                                });
                            }
                        });
                    });

                    res.status(200).json(availableHotelWithRoomResult);
                    connection.release();
                    sshClient.end()
                }
            )
        })
    } catch (error) {
        console.log("Error in hotel controller", error.message);
        res.status(500).json({ error: "Internal Server Error" }); 
    }
}
