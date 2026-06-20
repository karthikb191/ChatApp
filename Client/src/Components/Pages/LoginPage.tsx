
import React, { useState } from 'react'
import { InputField, PasswordField, SubmitButton } from '../InputComponents'
import "../../App.css"
import "../InputComponents.css"
import {useAuthContext, type SigninFormParams} from './../../Store/authContext';

type LoginPageParams =
{
    onSubmitClick? : React.MouseEventHandler<HTMLButtonElement>;
    handleFormSubmit? : (arg0: SigninFormParams)=>void;
};

const InputFormContainer = ({handleFormSubmit} : LoginPageParams) => 
{
    const [formData, setFormData] = useState(
            {
                email: "",
                password: ""
            }
        );

    function onFormSubmit(e : React.SubmitEvent<HTMLFormElement>)
    {
        e.preventDefault();
        handleFormSubmit?.(formData);
    }

    return (
    <div className="centerAlign">
        <form className="formArea centerAlign" onSubmit={onFormSubmit}>
            <div className='inputEntry'>
            <InputField id="UsernameField" placeholder="Email" 
                onChange={ (e) => setFormData({...formData, email: e.target.value})}></InputField>
            </div>    
            
            <div className='inputEntry'>
            <PasswordField id="PasswordField" placeholder="Password"
                onChange={(e) => setFormData({...formData, password: e.target.value})}></PasswordField>
            </div>

            <div>
                <SubmitButton name="login" text="Login"></SubmitButton>
            </div>
        </form>
    </div>
    )
}

const LoginPage = () =>
{
    const {isSigningIn, signin} = useAuthContext();

    // const [formData, setFormData] = useState(
    //     {
    //         fullName: "",
    //         email: "",
    //         password: ""
    //     }
    // );

    function HandleFormSubmit(signinParams : SigninFormParams)
    {
        console.log("Performing Signin");
        signin(signinParams);
    }

    return (
        <>
            <h1> This is Login page </h1>
            <InputFormContainer handleFormSubmit={HandleFormSubmit}/>
        </>
    )
}

export default LoginPage