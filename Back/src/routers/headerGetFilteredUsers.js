
import express from 'express';
import { getUsersFilteredByChars } from '../controllers/headerController.js';
import authorizationValidation from '../middlewares/authorizationValidation.js'
const router = express.Router();

router.get("/users/search/:partOfUsername", authorizationValidation, getUsersFilteredByChars)

export default router;

