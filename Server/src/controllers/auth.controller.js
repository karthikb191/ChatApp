import express from 'express'
import UserModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { CreateToken } from '../lib/Utils.js';
import mongoose from 'mongoose';

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export const signUp = async (req, res) => 
{
    const {username, email, password} = req.body
    try
    {
        if(password == null || username == null || email == null)
        {
            throw new Error("Entries for signup are not well defined");
        }
        if(password.length < 6)
        {
            res.status(404).json({ error: "Password should be atleast 6 characters" }); 
        }

        const user = await UserModel.findOne({email});
        if(user)
        {
            res.status(400).json({error : "Email already registered"});
        }

        //Encrypt the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create a new user and update Database
        const newUser = new UserModel(
            {   username: username,
                email: email,
                password: hashedPassword
            }
        );

        if(newUser)
        {
            CreateToken(newUser._id, res);
            await newUser.save();
            res.status(201).send(
                {
                    status: "New User Created",
                    id : newUser._id,
                    username : newUser.username,
                    email: newUser.email,
                }
            );
        }
        else
        {
            res.status(400).send({error: "Invalid user data"});
        }
    }
    catch(error)
    {
        res.status(404).json({ error: 'Unexpected exception ' + error}); 
    }
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export const signIn = async (req, res) => 
{
    const {email, password} = req.body
    
    try
    {
        const user = await UserModel.findOne({email});
        if(!user)
        {
            res.status(400).json({error : "User not found"});
        }

        //Password validation
        const isCorrect = bcrypt.compare(password, user.password);
        if(!isCorrect)
        {
            res.status(400).json({error : "Invalid Password"});
        }

        //Refresh JWT token since password is correct
        CreateToken(user._id, res);
            
        //User is found. Return his data
        res.status(200).json(
            {
                message: "Signin Successful",
                _id : user._id,
                email : user.email,
                username : user.username
            }
        )
    }
    catch(e)
    {
        console.log("ERROR when signing in: " + e.message);
        res.status(500).json({error: "Internal server error when signing in"});
    }
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export const signOut = (req, res) => 
{
    try
    {
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message: "Signout successful"});
    }
    catch(e)
    {
        res.status(500).json({error: "Internal server error when signing out"});
    }
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export const updateProfile = async (req, res) => 
{
    res.status(200).json({message: "Update call successful. Nothing changed"});
}