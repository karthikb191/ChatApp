
import express from 'express'
import { signUp, signIn, signOut } from '../controllers/auth.controller.js';

var authRoute = express.Router();

authRoute.get('/signup', signUp);
authRoute.get('/signin', signIn);
authRoute.get('/signout', signOut);

export default authRoute;