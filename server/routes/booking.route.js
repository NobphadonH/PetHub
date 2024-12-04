import express from "express";
import {
  createBooking,
  cancelBooking,
  updateBooking,
  getBookingStatusbyUserID,
  rejectBooking,
} from "../controllers/booking.controller.js";
import { verifyRole } from "../middleware/authVerify.js";

const router = express.Router();

router.post("/createBooking", verifyRole("Client"), createBooking);

router.post("/cancelBooking", verifyRole("Client"), cancelBooking);

router.post("/updateBooking", verifyRole("Host"), updateBooking);

router.post("/rejectBooking", verifyRole("Host"), rejectBooking)

router.get("/getBookingStatusbyUserID", verifyRole("Client"), getBookingStatusbyUserID);

export default router;
