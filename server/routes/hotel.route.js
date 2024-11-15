import express from "express";
import { getHotelByID, getHotelByVerification, verifyHotel, createHotel } from "../controllers/hotel.controller.js";
import multer from "multer";
import { verifyRole } from '../middleware/authVerify.js';

const upload = multer({dest: 'uploads/'})
const router =  express.Router();

router.get("/getHotelByID", getHotelByID);

router.get("/getHotelByVerification", getHotelByVerification);

router.post("/verifyHotel", verifyRole("Admin"), verifyHotel);

router.post("/createHotel", verifyRole("Host"), upload.single('selectedImage'), createHotel);

export default router;