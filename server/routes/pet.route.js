import express from "express";
import {
  createPet,
  getAllPetsByUserID,
  deletePetByPetID,
  updatePetByPetID,
} from "../controllers/pet.controller.js";

const router = express.Router();

router.post("/createPet", createPet);

router.post("/getAllPetsByUserID", getAllPetsByUserID);

router.post("/updatePetByPetID", updatePetByPetID);

router.post("/deletePetByPetID", deletePetByPetID);

export default router;
