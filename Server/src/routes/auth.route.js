
import express from 'express'
import { signUp, signIn, signOut, updateProfile, checkUser } from '../controllers/auth.controller.js';
import protectRoute from '../middleware/auth.middleware.js'

var authRoute = express.Router();

authRoute.post('/signup', signUp);
authRoute.post('/signin', signIn);
authRoute.get('/signout', signOut);

authRoute.put('/update-profile', protectRoute, updateProfile);

//Called whenever we refresh the page. Checks whether user is authenticated. If not, he should be thrown out to login screen
authRoute.put('/check', protectRoute, checkUser);

export default authRoute;