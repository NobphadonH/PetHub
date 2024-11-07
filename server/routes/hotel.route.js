import express from "express";
import { getHotelByID, getHotelByVerification, verifyHotel, createHotel } from "../controllers/hotel.controller";

const router =  express.Router();

router.get("/getHotelByID", getHotelByID);

router.get("/getHotelByVerification", getHotelByVerification);

router.post("/verifyHotel", verifyHotel);

router.post("/createHotel", createHotel);

export default router;