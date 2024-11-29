import express from 'express';
import { getHotelProfile, updateHotelProfile } from '../controllers/getHotelProfile.controller.js';

const router = express.Router();

// Route to get hotel profile by hotelID
router.get('/hostprofile/:fName/:lName', getHotelProfile);

// Update hotel description and policy
router.put('/updateHotelProfile/:fName/:lName', updateHotelProfile);

export default router;