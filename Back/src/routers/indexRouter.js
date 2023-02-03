import { Router } from "express";
import trendingsRouter from "./trendingsRouter.js";

const router = Router();

router.use(trendingsRouter);

export default router;
