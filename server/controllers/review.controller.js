import { connectToDatabase } from "../utils/dbConnection.js";

export const createReview = async (req, res) => {
  try {
    const { reviewScore, reviewDetail, hotelID } = req.body; // Get review details from the request body
    const userID = req.user.userID;
    // Validate input
    if (!reviewScore || !hotelID) {
      return res
        .status(400)
        .json({ error: "Review score and hotel ID are required." });
    }

    const { dbpool, sshClient } = await connectToDatabase();

    dbpool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting connection from pool:", err);
        sshClient.end();
        return res.status(500).json({ error: "Database connection failed." });
      }

      const insertQuery = `
        INSERT INTO Reviews (reviewScore, reviewDetail, hotelID, userID)
        VALUES (?, ?, ?, ?);
      `;

      connection.query(
        insertQuery,
        [reviewScore, reviewDetail || null, hotelID, userID],
        (err, result) => {
          connection.release(); // Release the connection back to the pool
          sshClient.end();

          if (err) {
            console.error("Error inserting review:", err);
            return res.status(500).json({ error: "Failed to create review." });
          }

          res.status(201).json({
            message: "Review created successfully.",
            reviewID: result.insertId, // Return the ID of the newly created review
          });
        }
      );
    });
  } catch (error) {
    console.error("Error in createReview controller:", error.message);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export const getHotelReviewByHotelID = async (req, res) => {
  try {
    const { hotelID } = req.params; // Get the hotelID from the URL parameter

    const { dbpool, sshClient } = await connectToDatabase();

    dbpool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting connection from pool:", err);
        sshClient.end();
        return res.status(500).json({ error: "Database connection failed" });
      }

      const query = `
        SELECT r.reviewID, r.reviewScore, r.reviewDetail, r.userID, h.hotelName
        FROM Reviews r
        JOIN Hotels h ON r.hotelID = h.hotelID
        WHERE r.hotelID = ?
      `;

      connection.query(query, [hotelID], (err, results) => {
        connection.release(); // Release the connection back to the pool
        sshClient.end();

        if (err) {
          console.error("Error fetching reviews:", err);
          return res.status(500).json({ error: "Failed to fetch reviews" });
        }

        if (results.length === 0) {
          return res
            .status(404)
            .json({ message: "No reviews found for this hotel" });
        }

        res.status(200).json({
          message: "Reviews fetched successfully",
          reviews: results,
        });
      });
    });
  } catch (error) {
    console.error(
      "Error in getHotelReviewByHotelID controller:",
      error.message
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};
