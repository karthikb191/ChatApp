import express from 'express'
import UserModel from '../models/user.model.js'
import MessageModel from '../models/message.model.js'

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export const getUsers = async (req, res) => {
    try
    {
        // This is populated in protectRoute call
        const loggedInUserId = req.user._id;
        const filteredUsers = await UserModel.find({_id : {$ne:loggedInUserId}});
        res.status(200).json(filteredUsers);
    }
    catch(exception)
    {
        console.log("Exception raised when fetching users: " + exception.message);
        res.status(500).json({error : "Exception raised when fetching users"});   
    }
}

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export const sendMessage = async (req, res) => {
    try
    {
        const {text} = req.body;
        const senderId = req.user._id;
        const {id: receiverId} = req.params;

        const message = new MessageModel(
            {
                senderId,
                receiverId,
                text
            }
        );

        await message.save();
        
        //TODO: Realtime functionality goes here

        res.status(200).json(message);
    }
    catch(exception)
    {
        console.log("Exception raised when sending message: " + exception.message);
        res.status(500).json({error : "Exception raised when sending message"});   
    }
}

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export const fetchMessageHistory = async (req, res) => {
    try
    {
        const loggedInUserId = req.user._id;

        const {id: friendId} = req.params;

        // We fetch messages if (we are sender AND other person is receiver) 
        // OR (we are receiver AND other person is sender)
        const messages = MessageModel.find(
            {
                $or: [
                    {senderId : loggedInUserId, receiverId : friendId},
                    {senderId : friendId, receiverId : loggedInUserId}
                ]
            }
        );

        res.status(200).json(messages);
    }
    catch(exception)
    {
        console.log("Exception raised when fetching users: " + exception.message);
        res.status(500).json({error : "Exception raised when fetching message history"});   
    }
}
