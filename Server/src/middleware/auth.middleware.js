import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {*} next 
 */
const protectRoute = async (req, res, next) =>
{
    try
    {
        const token = req.cookies.jwt;
        if(!token)
        {
            res.status(401).json({error: "Unauthorized access - No token provided"});
        }

        //Validate token
        const decodedtoken = jwt.verify(token, process.env.JWT_SECRET);
        if(!decodedtoken)
        {
            res.status(401).json({error: "Invalid JWT Token received. Auth failed"});   
        }

        //Query database for the valid user
        const user = await User.findById(decodedtoken.userId).select("-password");

        if(!user)
        {
            res.status(401).json({error: "User not found"});
        }

        //User if fully authenticated. Add user to the request and poll the next function
        req.user = user;
        next();
    }
    catch (error)
    {
        console.log("Error in protect route: " + error.message);
    }
}

export default protectRoute;