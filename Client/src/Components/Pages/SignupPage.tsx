import React from 'react'
import { InputField, PasswordField } from '../InputComponents'
import "../../App.css"
import "../InputComponents.css"

const SignupFormContainer = () => 
{
    return (
    <div className="centerAlign">
        <form className="formArea centerAlign">
            <div className='inputEntry'>
            <InputField id="UsernameField" placeholder="User Name / Email"></InputField>
            </div>    
            
            <div className='inputEntry'>
            <PasswordField id="PasswordField" placeholder="Password"></PasswordField>
            </div>
        </form>
    </div>
    )
}

const SignupPage = () =>
{
    return (
        <>
            <h1> This is Singup page </h1>
            <SignupFormContainer />
        </>
    );
}

export default SignupPage;