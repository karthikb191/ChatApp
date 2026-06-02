import React from 'react'
import './InputComponents.css'

type InputFieldProps = 
{
    id: string
    placeholder : string
};

const InputField = ({id, placeholder} : InputFieldProps) => 
{
    return (
        <>
        <input className="input" type="input" id={id} placeholder={placeholder}/>
        <label htmlFor={id} className="label"> {placeholder} </label>
        </>
    )
}

const PasswordField = ({id, placeholder} : InputFieldProps) =>
{
    return (
        <>
        <input className='input' type="password" id={id} placeholder={placeholder}/>
        <label htmlFor={id} className="label">{placeholder}</label>
        </>
    )
}

const SubmitButton = () =>
{
    return(
        <>
        </>
    )
}

export {InputField, PasswordField, SubmitButton}