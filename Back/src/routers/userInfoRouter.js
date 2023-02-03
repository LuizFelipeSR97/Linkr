import { Router } from "express";
import {getUserInfo} from "../controllers/userTimeline.js";
import authorizationValidation from "../middlewares/authorizationValidation.js";

const router = Router();

router.use('/userInfo/:id', authorizationValidation, getUserInfo);

export default router;