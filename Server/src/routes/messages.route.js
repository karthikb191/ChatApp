import express from 'express'
import protectRoute from '../middleware/auth.middleware.js'

import {getUsers, sendMessage, fetchMessageHistory} from '../controllers/messages.controller'

var messageRouter = express.Router();

messageRouter.get('/users', protectRoute, getUsers);
messageRouter.post('/send/:id', protectRoute, sendMessage);
messageRouter.get('/:id', protectRoute, fetchMessageHistory);

export default messageRouter;