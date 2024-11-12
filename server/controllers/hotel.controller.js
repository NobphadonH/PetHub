import { connectToDatabase } from "../utils/dbConnection.js";
import { uploadFileToS3, downloadFileFromS3 } from "../utils/s3FileTransfer.js";
import fs from 'fs'

export const getHotelByID = async (req, res) => {
    try {
        const {hotelID} = req.body
        const { dbpool, sshClient } = await connectToDatabase();
        
        dbpool.getConnection(async (err, connection) => {
            if (err) {
                console.error("Error getting connection from pool:", err);
                sshClient.end();
                return;
            }

            connection.query("SELECT * FROM Hotels WHERE hotelID = ?",
                [hotelID],
                (err, rows) => {
                    if (err) throw err
                    const hotelData = rows[0];

                    const imageKey = hotelData.hotelPhoto

                    downloadFileFromS3(imageKey).then((photoData) => {
                        const hotelPhotoBuffer = photoData.Body
                        res.status(200).json({
                            ...hotelData,
                            hotelPhoto: `data:${photoData.ContentType};base64,${hotelPhotoBuffer.toString('base64')}`
                        })
                        connection.release()
                        sshClient.end()
                    }).catch((error) => {
                        console.error("download failed:", error)
                        if (!res.headersSent) { // Ensure response is not already sent
                            res.status(500).json({ error: 'Failed to download photo from S3' });
                        }
                    })

                    // res.status(200).send(hotelData)
                    // connection.release()
                    // sshClient.end()
                }
            )
        })
    } catch (error) {
        console.log("Error in hotel controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getHotelByVerification = async (req, res) => {
    try {
        const {verification} = req.body
        const { dbpool, sshClient } = await connectToDatabase();
        
        dbpool.getConnection(async (err, connection) => {
            if (err) {
                console.error("Error getting connection from pool:", err);
                sshClient.end();
                return;
            }

            connection.query("SELECT * FROM Hotels WHERE verification = ?", 
                [verification],
                async (err, rows) => {
                if (err) throw err;

                const hotelsDataWithPhoto = [];

                try {
                    // Use a for...of loop with await to ensure the photos are downloaded sequentially
                    for (let hotelData of rows) {
                        const imageKey = hotelData.hotelPhoto;
                
                        // Wait for the download to complete before moving to the next
                        const photoData = await downloadFileFromS3(imageKey);
                        const hotelPhotoBuffer = photoData.Body;
                        const hotelPhotoFile = `data:${photoData.ContentType};base64,${hotelPhotoBuffer.toString('base64')}`;
                        
                        // Add the photo data to the hotel data
                        hotelData.hotelPhoto = hotelPhotoFile;
                        
                        // Push the modified hotel data into the result array
                        hotelsDataWithPhoto.push(hotelData);
                    }
                
                    // Send the response after all photos are processed
                    res.status(200).json(hotelsDataWithPhoto);
                    connection.release()
                    sshClient.end()
                } catch (error) {
                    // Catch and handle any errors that occur during the process
                    console.error("Error downloading photos:", error);
                    if (!res.headersSent) {
                        res.status(500).json({ error: 'Failed to download photo from S3', details: error.message });
                        connection.release()
                        sshClient.end()
                    }
                }
            })
        })
    } catch (error) {
        console.log("Error in hotel controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const verifyHotel = async (req, res) => {
    try {
        const {hotelID} = req.body
        const { dbpool, sshClient } = await connectToDatabase();

        dbpool.getConnection(async (err, connection) => {
            if (err) {
                console.error("Error getting connection from pool:", err);
                sshClient.end();
                return;
            }

            connection.query("UPDATE hotels SET verification = ? WHERE hotelID = ?",
                ["verified", hotelID],
                (err, result) => {
                    if (err) throw err;
                    console.log("Verify successfully")
                    res.status(200)
                    connection.release()
                    sshClient.end()
                }
            )
        })

    } catch (error) {
        console.log("Error in hotel controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const createHotel = async (req, res) => {
    try {
        const {hotelName, hotelType, hotelDescription, hotelPolicy, hotelAddress, district, selectedImage} = req.body
        const filePath = req.file.path
        const fileName = req.file.filename
        const fileContent = fs.readFileSync(filePath)

        // res.status(200);
        console.log(req.body)
        // console.log(req.file)
        // return;
        const { dbpool, sshClient } = await connectToDatabase();

        uploadFileToS3(fileName, fileContent, req.file.mimetype).then((url) => {
            console.log("uploaded file URL:", url)
            
            dbpool.getConnection(async (err, connection) => {
                if (err) {
                    console.error("Error getting connection from pool:", err);
                    sshClient.end();
                    return;
                }
                const mapLat = "20"
                const mapLong = "30"
                const query = `INSERT INTO Hotels (hotelName, hotelType, hotelDescription, hotelPolicy, hotelAddress, district, mapLat, mapLong,
                 hotelPhoto, verification) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

                connection.query(
                    query,
                    [hotelName, hotelType, hotelDescription, hotelPolicy, hotelAddress, district, mapLat, mapLong,  url, "unverified"],
                    (err, results) => {
                        if (err) throw err
                        console.log(results)
                        res.status(200).send(results.insertId)
                        connection.release()
                        sshClient.end()
                    }
                )

            })

        }).catch((error) => {
            console.error("upload failed:", error)
        })



    } catch (error) {
        console.log("Error in hotel controller", error.message);
        res.status(500).json({ error: "Internal Server Error" }); 
    }
}

