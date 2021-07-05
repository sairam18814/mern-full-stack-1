import React from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import "./Chat.css";
import { AttachFile, MoreVert, SearchOutlined, SettingsInputAntenna } from '@material-ui/icons';
import  InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from "@material-ui/icons/Mic";

function Chat({ messages }) {
    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar />
                <div className="chat_headerInfo">
                    <h3>Room name</h3>
                    <p>Last seen at....</p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">
                {messages.map((message) => (
                    <p className={`chat_message ${message.received && "chat_reciever"}`}>
                        <span className="chat_name">{message.name}</span>
                        {message.message}
                        <span className="chat_timestamp">{message.timestamp}</span>
                    </p>
                ))}

            </div>

            <div className="chat_footer">
                <InsertEmoticonIcon/>
                <form>
                    <input placeholder="Type a message" type="text"/>
                    <button type="submit">
                        Send a message
                    </button>
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}

export default Chat;
