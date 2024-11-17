import { connectToDatabase } from "../utils/dbConnection.js";
import bcrypt from "bcrypt";

export const createCreditCard = async (req, res) => {
    try {
        const {userID, cardNumber, expirationDate, cardHolderName, cvv} = req.body
        
        const { dbpool, sshClient } = await connectToDatabase();

        const token = await bcrypt.hash(cardNumber, 10);

        if (!cardNumber || !expirationDate || !cardHolderName || !cvv) {
            return res
              .status(400)
              .json({ error: "All card data are required." });
          }
        
        dbpool.getConnection(async (err, connection) => {
            if (err) {
                console.error("Error getting connection from pool:", err);
                sshClient.end();
                return res.status(500).json({ error: "Database connection failed" });
            }

            const query = `
            INSERT INTO creditCards (cardToken, lastFourDigits, expirationDate, cardHolderName, userID)
            VALUES (?, ?, ?, ?, ?)
          `;
          const values = [token, cardNumber.slice(-4), expirationDate, cardHolderName, userID];

        })

    }catch (error) {
        console.log("Error in hotel controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
