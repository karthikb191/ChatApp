
import React, { useState } from 'react'
import { InputField, PasswordField, SubmitButton } from '../InputComponents'
import "../../App.css"
import "../InputComponents.css"
import {authContext, useAuthContext} from './../../Store/authContext';

type LoginPageParams =
{
    onSubmitClick? : React.MouseEventHandler<HTMLButtonElement>;
    onFormSubmit? : React.SubmitEventHandler<HTMLFormElement>;
};

const InputFormContainer = ({onSubmitClick, onFormSubmit} : LoginPageParams) => 
{
    return (
    <div className="centerAlign">
        <form className="formArea centerAlign" onSubmit={onFormSubmit}>
            <div className='inputEntry'>
            <InputField id="UsernameField" placeholder="User Name / Email"></InputField>
            </div>    
            
            <div className='inputEntry'>
            <PasswordField id="PasswordField" placeholder="Password"></PasswordField>
            </div>

            <div>
                <SubmitButton name="login" text="Login" onClick={onSubmitClick}></SubmitButton>
            </div>
        </form>
    </div>
    )
}

const LoginPage = () =>
{
    

    function SubmitLogin()
    {
        console.log("Login button clicked");
    }

    // const [formData, setFormData] = useState(
    //     {
    //         fullName: "",
    //         email: "",
    //         password: ""
    //     }
    // );

    function HandleFormSubmit(e : React.SubmitEvent<HTMLFormElement>)
    {
        console.log("Submitting Form");
    }

    return (
        <>
            <h1> This is Login page </h1>
            <InputFormContainer onSubmitClick={SubmitLogin} onFormSubmit={HandleFormSubmit}/>
        </>
    )
}

export default LoginPage