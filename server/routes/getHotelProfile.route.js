import express from 'express';
import { getHotelProfile } from '../controllers/getHotelProfile.controller.js';

const router = express.Router();

// Route to get hotel profile by hotelID
router.get('/hostprofile/:hotelID', getHotelProfile);

export default router;