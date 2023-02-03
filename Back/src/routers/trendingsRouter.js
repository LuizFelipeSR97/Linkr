import { Router } from "express";

import {
  insert,
  list,
  filter,
  relationateLinkWithHashtag,
  getHashtagId,
} from "../controllers/trendingsControllers.js";
import authorizationValidation from "../middlewares/authorizationValidation.js";

const trendingsRouter = Router();

trendingsRouter.post("/hashtag", authorizationValidation, insert);
trendingsRouter.get("/trending", authorizationValidation, list);

trendingsRouter.get("/hashtag/:hashtag", authorizationValidation, filter);

trendingsRouter.get(
  "/oneHashtag/:hashtag",
  authorizationValidation,
  getHashtagId
);
trendingsRouter.post(
  "/relationateLinkWithHashtag",
  authorizationValidation,
  relationateLinkWithHashtag
);

export default trendingsRouter;
