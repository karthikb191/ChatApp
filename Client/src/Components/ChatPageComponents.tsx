//import React from 'react'

type TextProps =
{
    data : string;
    classNameStr : string;
};

type SendButtonProps = 
{
    onClick : () => void;
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
    return (
        <>
        <div id = "textInputContainer">
            <input id="inputField" type="text" minLength={1} maxLength={256} >
            </input>
            <input id="sendButton" type="button" onClick={props.onClick}/>
        </div>
        </>
    )
}

function MessageWindow()
{

}

export {ProfileHolder, MessageContainer, TextInputBar, MessageWindow, TextComponent}