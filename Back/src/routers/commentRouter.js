import express from "express";
import { getComments, getCommentsCount, postComment } from "../controllers/commentController.js";

const commentRouter = express.Router();

commentRouter.post(
    "/comment",
    postComment
);

commentRouter.get(
    "/commentCount/:id",
    getCommentsCount
);

commentRouter.get(
    "/comment/:id",
    getComments
);

export default commentRouter;