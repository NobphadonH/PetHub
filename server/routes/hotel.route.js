import express from "express";
import { getHotelByID, getHotelByVerification, verifyHotel, createHotel } from "../controllers/hotel.controller.js";
import multer from "multer";

const upload = multer({dest: 'uploads/'})
const router =  express.Router();

router.get("/getHotelByID", getHotelByID);

router.get("/getHotelByVerification", getHotelByVerification);

router.post("/verifyHotel", verifyHotel);

router.post("/createHotel", upload.single('selectedImage'), createHotel);

export default router;