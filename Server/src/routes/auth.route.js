
import express from 'express'
import { signUp, signIn, signOut } from '../controllers/auth.controller.js';

var authRoute = express.Router();

authRoute.post('/signup', signUp);
authRoute.post('/signin', signIn);
authRoute.get('/signout', signOut);

export default authRoute;