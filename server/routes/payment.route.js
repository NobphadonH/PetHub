import express from "express";
import { createPayment } from "../controllers/payment.controller.js";
import { verifyRole } from "../middleware/authVerify.js";

const router = express.Router();

router.post("/createPayment", verifyRole("Client"), createPayment);

export default router;
