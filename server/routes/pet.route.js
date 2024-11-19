import express from "express";
import {
  createPet,
  getAllPetsByUserID,
  deletePetByPetID,
  updatePetByPetID,
  getMatchingPets,
} from "../controllers/pet.controller.js";
import multer from "multer";
import { verifyRole } from "../middleware/authVerify.js";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post(
  "/createPet",
  verifyRole("Client"),
  upload.single("selectedImage"),
  createPet
);

router.get("/getAllPetsByUserID", verifyRole("Client"), getAllPetsByUserID);

router.post(
  "/updatePetByPetID",
  verifyRole("Client"),
  upload.single("selectedImage"),
  updatePetByPetID
);

router.post("/deletePetByPetID", verifyRole("Client"), deletePetByPetID);

router.get("/getMatchingPets", verifyRole("Client"), getMatchingPets);

export default router;
