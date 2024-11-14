import express from "express";
import { getRoomDetails } from "../controllers/roomManage.controller.js";

const router = express.Router();

// Route to get the details of a specific room within a hotel
router.get("/:hotelID/:roomTypeID", getRoomDetails);

export default router;