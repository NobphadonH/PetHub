import express from "express";
import {
  createPet,
  getAllPetsByUserID,
  deletePetByPetID,
  updatePetByPetID,
  getMatchingPets,
} from "../controllers/pet.controller.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/createPet", upload.single("filename"), createPet);

router.post("/getAllPetsByUserID", getAllPetsByUserID);

router.post("/updatePetByPetID", upload.single("filename"), updatePetByPetID);

router.post("/deletePetByPetID", deletePetByPetID);

router.post("/getMatchingPets", getMatchingPets);

export default router;
