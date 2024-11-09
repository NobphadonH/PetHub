import express from "express";
import {
  getProfilebyUserID,
  updateProfilebyUserID,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get('/getProfilebyUserID',getProfilebyUserID,);
router.put('/updateProfilebyUserID',updateProfilebyUserID,);

export default router;