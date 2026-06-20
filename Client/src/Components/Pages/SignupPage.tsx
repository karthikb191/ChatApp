import React, { useState } from 'react'
import { InputField, PasswordField, SubmitButton } from '../InputComponents'
import "../../App.css"
import "../InputComponents.css"
import {useAuthContext, type SignupFormParams} from './../../Store/authContext';

type SignupPageParams =
{
    handleFormSubmit : (params : SignupFormParams) => void;
}

const SignupFormContainer = ({handleFormSubmit} : SignupPageParams) => 
{
    const [formData, setFormData] = useState(
        {
            username: "",
            email: "",
            password: ""
        }
    );

    function OnFormSubmit(event : React.SubmitEvent<HTMLFormElement>)
    {
        //NOTE: This prevents refreshing the entire page
        event.preventDefault();
        console.log("Submitting form");
        handleFormSubmit(formData);
    }

    return (
    <div className="centerAlign">
        <form className="formArea centerAlign" onSubmit={OnFormSubmit}>
            <div className='inputEntry'>
                <InputField id="UsernameField" placeholder="User Name"
                    onChange={(e) => setFormData({...formData, username: e.target.value})}>

                </InputField>
            </div>

            <div className='inputEntry'>
                <InputField id="EmailField" placeholder="Email"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}>
                </InputField>
            </div>    
            
            <div className='inputEntry'>
                <PasswordField id="PasswordField" placeholder="Password"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}>
                </PasswordField>
            </div>

            <div>
                <button type="submit"> Signup </button>
                {/*<SubmitButton name="signup" text="Signup"></SubmitButton>*/}
            </div>
        </form>
    </div>
    )
}

const SignupPage = () =>
{
    const {isSigningUp, signup} = useAuthContext();

    function HandleFormSubmit(data : SignupFormParams)
    {
        console.log("Submitting Form. Passing on to Auth Context");
        signup(data);
    }

    return (
        <>

            <h1> {isSigningUp ?  "Signing UP!!!! Wait for it" : "This is Signup page"}</h1>
            <SignupFormContainer handleFormSubmit={HandleFormSubmit}/>
        </>
    );
}

export default SignupPage;