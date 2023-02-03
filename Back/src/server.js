import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

import router from "./routers/indexRouter.js";
import timelineRouter from "./routers/timelineRouter.js";
import sigsRout from "./routers/sigs.router.js";
import likesRout from "./routers/likes.routers.js";
import userPostsRouter from "./routers/userPostsRouter.js";
import userInfoRouter from './routers/userInfoRouter.js';
import routeGetUsersHeader from './routers/headerGetFilteredUsers.js';
import commentRouter from "./routers/commentRouter.js";
import followRouter from "./routers/followsRout.js";
import shareRout from './routers/sharesRouter.js'

dotenv.config();

const server = express();
server.use(json());
server.use(cors());

server.use(router);

server.use(sigsRout);

server.use(timelineRouter);

server.use(likesRout);

server.use(userPostsRouter);

server.use(userInfoRouter);

server.use(routeGetUsersHeader);

server.use(commentRouter);

server.use(followRouter)

server.use(shareRout)


server.listen(process.env.PORT, () => {
  console.log("Servidor rodando na porta " + process.env.PORT);
});
