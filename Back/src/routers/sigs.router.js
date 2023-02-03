import {signUpValidation, signInValidation} from '../middlewares/sigsValidation.js'
import authorizationValidation from '../middlewares/authorizationValidation.js';
import { signValid, signUp , signIn } from '../controllers/sigsController.js' 
import express from 'express';

const sigsRout = express.Router();

sigsRout.get("/signvalid", authorizationValidation, signValid);

sigsRout.post("/signup", signUpValidation, signUp);

sigsRout.post("/signin", signInValidation, signIn);

export default sigsRout;
