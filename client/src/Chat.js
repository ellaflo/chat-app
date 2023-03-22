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
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, [socket, room]);

  const sendMessage = (text) => {
    socket.emit('message', { room, text });
  };

  return (
    <div className="chat">
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
