import express from "express";

import {
  deleteLink,
  getLinks,
  postLinks,
  getLastLinkId,
  updateLink,
} from "../controllers/timelineController.js";
import authorizationValidation from "../middlewares/authorizationValidation.js";
import { isItUrl } from "../middlewares/timelineValidation.js";

const timelineRouter = express.Router();

timelineRouter.post("/timeline", authorizationValidation, isItUrl, postLinks);

timelineRouter.get("/timeline", authorizationValidation, getLinks);

timelineRouter.get("/lastLink", authorizationValidation, getLastLinkId);

timelineRouter.delete("/deleteTimeline/:id", deleteLink);

timelineRouter.put("/updateTimeline/:id", updateLink);

export default timelineRouter;
