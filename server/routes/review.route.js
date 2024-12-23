import express from "express";
import {
  createReview,
  getHotelReviewByHotelID,
} from "../controllers/review.controller.js";
import { verifyRole } from "../middleware/authVerify.js";

const router = express.Router();

router.post("/createReview", verifyRole("Client"), createReview);

router.get("/getReview/:hotelID", getHotelReviewByHotelID);

export default router;
