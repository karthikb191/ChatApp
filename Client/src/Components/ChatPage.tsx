import React from "react";
import { useState } from 'react';
import {ProfileHolder, TextInputBar, TextComponent} from './ChatPageComponents'


class ChatPage extends React.Component
{
    constructor(props = {})
    {
        super(props);

        this.state = 
        {
            messageHolder : this.messageHolder
        };
    }

    render()
    {
        // Message holder 
        // input type box
        const messageNodes = this.state.messageHolder.map(
            (message : string) => <TextComponent data={message} classNameStr="messageItem" />
        );

        return (
            <div id="chatWindow">
                <div id="messagesList">
                    {messageNodes}
                </div>
                <TextInputBar onClick={this.onSendClicked}/>
            </div>
        );
    }

    onSendClicked = (messageData: string) =>
    {
        if(messageData.length == 0)
        {
            return;
        }
        this.addMessage(messageData)
        this.setState({messageHolder: this.messageHolder})
        
        // messageHolder.map(
        //     () => console.log("testtt")
        // );
        //this.addMessage((this.messageHolder.length + 1).toString());
    }

    addMessage(message: string) : void
    {
        this.messageHolder.unshift(message)
    }

    messageHolder : string[] = []
};

export default ChatPage