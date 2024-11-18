import express from "express";
import { getRoomDetails, updateBookingStatus } from "../controllers/roomManage.controller.js";

const router = express.Router();

// Route to get the details of a specific room within a hotel
router.get("/:roomTypeID", getRoomDetails);

router.put('/bookings/:bookingID/status', updateBookingStatus);

// Update hotel description and policy by hotelID
// router.put("/update/:roomTypeID", updateRoomDetails);

export default router;