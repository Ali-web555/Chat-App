import React from 'react';
import { useState } from 'react'
import "./App.css";
// import "./bootstrap/dist/css/bootstrap.css"
import io from 'socket.io-client';
import Chat from './Chat';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route
// } from "react-router-dom";

// const socket = io.connect("http://localhost:3001");
const socket = io.connect("http://192.168.43.146:3001");

function App() {
 const [username, setUsername] = useState("");
 const [room, setRoom] = useState("");
 const [showChat, setShowChat] = useState(false);

 const joinRoom = () =>{
  if (username !== "" && room !=="") {
    socket.emit("join_room", room);
    setShowChat(true)
  };
 };
  return ( 
    <div className="App">
    {!showChat ? (
      <div className="joinChatContainer">
        <h3>Join A Chat</h3>
        <input
          type="text"
          placeholder="Name..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Room ID..."
          onKeyPress={(event) => {event.key === "Enter" && joinRoom()}}
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />
        <button onClick={joinRoom}>Join A Room</button>
      </div>
    ) : (
      <Chat socket={socket} username={username} room={room} />
    )}
  </div>
  );
};

export default App;
