import React from 'react'
import './InputComponents.css'

type InputFieldProps = 
{
    id: string
    placeholder : string
    onChange? : React.ChangeEventHandler<HTMLInputElement, HTMLInputElement>
};

type InputButtonProps = 
{
    name : string;
    text : string;
    onClick? : React.MouseEventHandler<HTMLButtonElement>;
}

const InputField = ({id, placeholder, onChange} : InputFieldProps) => 
{
    return (
        <>
        <input className="input" type="input" id={id} placeholder={placeholder} onChange={onChange}/>
        <label htmlFor={id} className="label"> {placeholder} </label>
        </>
    )
}

const PasswordField = ({id, placeholder, onChange} : InputFieldProps) =>
{
    return (
        <>
        <input className='input' type="password" id={id} placeholder={placeholder} onChange={onChange}/>
        <label htmlFor={id} className="label">{placeholder}</label>
        </>
    )
}

const SubmitButton = ({name, text, onClick} : InputButtonProps) =>
{
    return(
        <>
        <button className='inputButton' name={name} onClick={onClick} type='submit'> {text} </button>
        </>
    )
}

export {InputField, PasswordField, SubmitButton}