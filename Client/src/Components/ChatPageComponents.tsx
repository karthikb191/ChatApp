//import React from 'react'

import React, { useState, useCallback } from "react";

type TextProps =
{
    data : string;
    classNameStr : string;
};

type SendButtonProps = 
{
    onClick : (arg0: string) => void;
};

function ProfileHolder()
{
    return <h2> {"TEST Hello Hello TEST TESST"} </h2>
}

function MessageContainer()
{

}

function TextComponent(props : TextProps)
{
    return (
        <div className={props.classNameStr}>
            <p>{props.data}</p> 
        </div>
    );
}

function TextInputBar(props : SendButtonProps)
{
    const [textInput, SetInputText] = useState('');

    const HandleClick = () =>{
        props.onClick(textInput);
        SetInputText('');
    }

    const HandleTextChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
        (event)=>{
            SetInputText(event.target.value);
        }
        , [SetInputText]
    )

    return (
        <>
        <div id = "textInputContainer">
            <input id="inputField" type="text" minLength={1} maxLength={256} value={textInput} onChange={HandleTextChange} >
            </input>
            <input id="sendButton" type="button" onClick={HandleClick}/>
        </div>
        </>
    )
}

function MessageWindow()
{

}

export {ProfileHolder, MessageContainer, TextInputBar, MessageWindow, TextComponent}