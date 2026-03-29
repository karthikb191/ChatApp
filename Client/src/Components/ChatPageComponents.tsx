//import React from 'react'

function ProfileHolder()
{
    return <h2> {"TEST Hello Hello TEST TESST"} </h2>
}

function MessageHolder()
{

}

function TextInputBar()
{
    return (
        <>
        <div id = "textInputContainer">
            <input id="inputField" type="text" minLength={1} maxLength={256} >
            </input>
            <input id="sendButton" type="button" />
        </div>
        </>
    )
}

function MessageWindow()
{

}

export {ProfileHolder, MessageHolder, TextInputBar, MessageWindow}