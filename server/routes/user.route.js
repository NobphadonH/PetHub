import express from "express";
import {
  getProfilebyUserID,
  updateProfilebyUserID,
} from "../controllers/user.controller.js";
import { verifyRole } from "../middleware/authVerify.js";

const router = express.Router();

router.get('/getProfilebyUserID', verifyRole("Client"), getProfilebyUserID,);
router.put('/updateProfilebyUserID', verifyRole("Client"), updateProfilebyUserID,);

export default router;