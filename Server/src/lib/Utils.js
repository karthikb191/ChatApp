import jws from "jsonwebtoken"
import express from "express"

/**
 * 
 * @param {any} payload 
 * @param {express.Response} res 
 */
const CreateToken = (payload, res) => {
    
    console.log("Payload:" + payload);

    const signedToken = jws.sign({payload}, process.env.JWT_SECRET, 
        {
            expiresIn: "7d"
        }
    );

    //TODO: Read about cookies
    res.cookie('jwt',
        signedToken,
        {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true, //prevents XSS Cross site scripting attacks. Don't know what this is. Need to read up on it.
            sameSite: "strict",
            secure: process.env.NODE_ENV != "development"
        }
    )
}

export {CreateToken};