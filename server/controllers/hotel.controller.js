import { connectToDatabase } from "../utils/dbConnection.js";
import { uploadFileToS3, downloadFileFromS3 } from "../utils/s3FileTransfer.js";

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

            connection.query("SELECT * FROM hotels WHERE hotelID = ?",
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
                    }).catch((error) => {
                        console.error("download failed:", error)
                    })

                    res.status(200).send(hotelData)
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

export const getHotelByVerication = async (req, res) => {
    try {
        const {verification} = req.body
        const { dbpool, sshClient } = await connectToDatabase();
        
        dbpool.getConnection(async (err, connection) => {
            if (err) {
                console.error("Error getting connection from pool:", err);
                sshClient.end();
                return;
            }

            connection.query("SELECT * FROM hotels WHERE verification = ?", 
                [verification],
                (err, rows) => {
                if (err) throw err;

                res.status(200).send(rows)
                connection.release()
                sshClient.end()
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
        const {hotelName, hotelType, hotelDetail, hotelPolicy, hotelAddress, checkInFrom, checkOutUntil} = req.body
        const filePath = req.file.path
        const fileName = req.file.originalName
        const fileContent = fs.readFileSync(filePath)

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
                const query = `INSERT INTO Hotels (hotelName, hotelType, hotelDetail, hotelPolicy, hotelAddress, mapLat, mapLong,
                checkInFrom, checkOutUntil, hotelPhoto, verification) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

                connection.query(
                    query,
                    [hotelName, hotelType, hotelDetail, hotelPolicy. hotelAddressm, mapLat, mapLong, checkInFrom, checkOutUntil, url, "unverified"],
                    (err, results) => {
                        if (err) throw err
                        console.log(results)
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