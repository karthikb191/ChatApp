
import React from 'react'
import { InputField, PasswordField } from '../InputComponents'
import "../../App.css"
import "../InputComponents.css"

const InputFormContainer = () => 
{
    return (
    <div className="centerAlign">
        <div className='inputEntry'>
        <InputField id="UsernameField" placeholder="User Name / Email"></InputField>
        </div>
        
        <div className='inputEntry'>
        <PasswordField
                id="PasswordField" placeholder="Password"></PasswordField>
        </div>
    </div>
    )
}

const LoginPage = () =>
{
    return (
        <>
            <h1> This is Login page </h1>
            <InputFormContainer />
        </>
    )
}

export default LoginPage