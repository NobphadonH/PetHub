import express from "express";
import {
  createBooking,
  cancelBooking,
  updateBooking,
} from "../controllers/booking.controller.js";
import { verifyRole } from "../middleware/authVerify.js";

const router = express.Router();

router.post("/createBooking", verifyRole("Client"), createBooking);

router.post("/cancelBooking", verifyRole("Client"), cancelBooking);

router.post("/updateBooking", verifyRole("Client"), updateBooking);

export default router;
