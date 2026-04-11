import express from 'express'
import userModel from '../models/user.model.js';

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export const signUp = (req, res) => 
{
    res.send("auth - signup");
    const {username, email, password} = req.body
    try
    {
        if(password.length < 6)
        {
            res.status(404).json({ error: 'Password should be atleast 6 characters' }); 
        }
    }
    catch(error)
    {

    }
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export const signIn = (req, res) => 
{   
    res.send("auth - signin");
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export const signOut = (req, res) => 
{
    res.send("auth - signout");
}