import express from 'express';
import { createRooms } from '../controllers/room.controller.js';
import multer from "multer";
import { verifyRole } from '../middleware/authVerify.js';

const upload = multer({dest: 'uploads/'})
const router = express.Router();

router.post("/createRooms", verifyRole("Host"), upload.any(),  createRooms);

export default router;