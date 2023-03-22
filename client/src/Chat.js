import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Chat.css';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState('general');
  const socket = io('http://localhost:5001');

  useEffect(() => {
    socket.on('connect', () => {
      // Join the room
      socket.emit('join', room);
    });

    socket.on('message', (message) => {
      console.log('Received message:', message); // Add this line for debugging
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, [socket, room]);

  const sendMessage = (text) => {
    console.log('sendMessage:', text); // Add this line for debugging
    socket.emit('message', { room, text });
  };

  const handleRoomChange = (event) => {
    setRoom(event.target.value);
  };

  return (
    <div className="chat">
      <select value={room} onChange={handleRoomChange}>
        <option value="general">General</option>
        <option value="tech">Tech</option>
        <option value="random">Random</option>
      </select>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.text}</li>
        ))}
      </ul>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          sendMessage(event.target.elements[0].value);
          event.target.reset();
        }}
      >
        <input type="text" placeholder="Enter message" />
        <button>Send</button>
      </form>
    </div>
  );
  
}

export default Chat;
