import React from 'react';
import { useState, useEffect} from 'react';
// import soundfile from "./ding.mp3"
const ding = new Audio ("./ding")
// import ScrollToBottom from "react-scroll-to-bottom";

function Chat({socket, username, room}) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
            room: room,
            author: username,
            message: currentMessage,
            time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
        };
        await socket.emit("send_message", messageData);
        setMessageList((List) => [...List, messageData]);
    };
};
useEffect(() => {
    socket.on("receive_message", (data) =>{
            setMessageList((List) => [...List, data]);
        })
    }, [socket])
    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat App</p>
            </div>
            <div className="chat-body">
                {/* <ScrollToBottom className="message-container"> */}
                <div className="message-container">
                {messageList.map((messageContent) =>{
                    return <div className="message" id={username === messageContent.author ? "You" : "other"}>
                    <div>
                        <div className="message-content">
                            <p>{messageContent.message}</p>
                        </div>
                        <div className="message-meta">
                            <p id="time">{messageContent.time}</p>
                            <p id="author">{messageContent.author}</p>
                            {/* {ding.play()} */}
                        </div>
                    </div>    
                     </div>
                })  }
                </div>
                {/* </ScrollToBottom> */}
            </div>
            <div className="chat-footer">
                <input type="text"  id="message" placeholder="Type a message..." autoComplete="off"
                onChange={(event) =>{
                    setCurrentMessage(event.target.value)
                }}
                onKeyPress={(event) => {event.key === "Enter" && sendMessage()}}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat
