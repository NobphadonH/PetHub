import express from "express";
import { getRoomDetails, updateBookingStatus, updateRoom } from "../controllers/roomManage.controller.js";
import multer from "multer";
import { verifyRole } from "../middleware/authVerify.js";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

// Route to get the details of a specific room within a hotel
router.get("/:roomTypeID", getRoomDetails);

router.put('/bookings/:bookingID/status', updateBookingStatus);

router.post('/updateRoom', verifyRole("Host"), upload.single("selectedImage"), updateRoom)

export default router;

