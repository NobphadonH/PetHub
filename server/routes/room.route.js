import express from 'express';
import { createRooms } from '../controllers/room.controller.js';
import multer from "multer";

const upload = multer({dest: 'uploads/'})
const router = express.Router();

router.post("/createRooms", upload.any(),  createRooms);

export default router;