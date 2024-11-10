import express from 'express';
import { getHotelAndRoomByFilter } from '../controllers/roomSearch.controller.js';

const router = express.Router();

router.get("/getHotelAndRoomByFilter", getHotelAndRoomByFilter);

export default router;