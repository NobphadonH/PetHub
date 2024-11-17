import express from 'express';
import { getHotelProfile, updateHotelProfile } from '../controllers/getHotelProfile.controller.js';

const router = express.Router();

// Route to get hotel profile by hotelID
router.get('/hostprofile/:hotelID', getHotelProfile);

// Update hotel description and policy by hotelID
router.put("/update/:hotelID", updateHotelProfile);

export default router;