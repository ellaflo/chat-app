import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Chat.css';

function Chat() {
  // Stores the message recieved from the server
  const [messages, setMessages] = useState([]);

  // Connecting to server
  const socket = io('http://localhost:4000');

  useEffect(() => {
    // Event Listener defined to recieve messages from the server 
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Return cleanup function to remove event listener
    return () => {
      socket.off('message');
    };
  }, [socket]);

  const sendMessage = (text) => {
    socket.emit('message', { text });
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
