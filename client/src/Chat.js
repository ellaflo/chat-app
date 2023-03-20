
import React, { useState } from 'react';
import io from 'socket.io-client';

// Stores the message recieved from the server
const [messages, setMessages] = useState([]);

// Connecting to server
const socket = io('http://localhost:4000');

// Event Listener defined to recieve messages from the server 
socket.on('message', (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  });

  const sendMessage = (text) => {
    socket.emit('message', { text });
  };

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.text}</li>
        ))}
      </ul>
      <form onSubmit={(event) => {
        event.preventDefault();
        sendMessage(event.target.elements[0].value);
        event.target.reset();
      }}>
        <input type="text" placeholder="Enter message" />
        <button>Send</button>
      </form>
    </div>
  );

  import React from 'react';
import './App.css';
import Chat from './Chat';

function App() {
  return (
    <div className="App">
      <Chat />
    </div>
  );
}

export default App;

  