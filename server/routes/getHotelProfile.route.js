import express from 'express';
import { getHotelProfile, updateHotelProfile } from '../controllers/getHotelProfile.controller.js';
import { verifyRole } from "../middleware/authVerify.js";

const router = express.Router();

// Route to get hotel profile by hotelID
router.get('/hostprofile/:fName/:lName', verifyRole("Host"), getHotelProfile);

// Update hotel description and policy
router.put('/updateHotelProfile/:fName/:lName', verifyRole("Host"), updateHotelProfile);

export default router;