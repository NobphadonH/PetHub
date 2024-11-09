import express from 'express'
import { createCreditCard } from '../controllers/creditCard.controller.js'

const router = express.Router()

router.post("/createCreditCard", createCreditCard);

export default router;