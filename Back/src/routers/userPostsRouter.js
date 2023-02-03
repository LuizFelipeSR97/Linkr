import { Router } from "express";
import {getPostsFilteredByUser} from "../controllers/userTimeline.js";
import authorizationValidation from "../middlewares/authorizationValidation.js";

const router = Router();

router.use('/userPosts/:id', authorizationValidation, getPostsFilteredByUser);

export default router;