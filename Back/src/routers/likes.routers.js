import authorizationValidation from '../middlewares/authorizationValidation.js';
import  {validDeslike, validLike}   from '../middlewares/likesValidation.js'
import {deletLike, like } from '../controllers/liksController.js'
import express from 'express';


const likesRout = express.Router();

likesRout.post("/dislike",authorizationValidation, validDeslike , deletLike);

likesRout.post("/like",authorizationValidation, validLike , like);


export default likesRout;