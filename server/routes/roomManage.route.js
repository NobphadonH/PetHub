import express from "express";
import { getRoomDetails, updateRoomDetails } from "../controllers/roomManage.controller.js";

const router = express.Router();

// Route to get the details of a specific room within a hotel
router.get("/:roomTypeID", getRoomDetails);

// Update hotel description and policy by hotelID
router.put("/update/:roomTypeID", updateRoomDetails);

export default router;