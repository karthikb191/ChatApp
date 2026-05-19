
import express from 'express'
import { signUp, signIn, signOut, updateProfile } from '../controllers/auth.controller.js';
import protectRoute from '../middleware/auth.middleware.js'

var authRoute = express.Router();

authRoute.post('/signup', signUp);
authRoute.post('/signin', signIn);
authRoute.get('/signout', signOut);

authRoute.put('/update-profile', protectRoute, updateProfile);

export default authRoute;