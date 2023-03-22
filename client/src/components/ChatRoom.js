import React from 'react';

function ChatRoom({ messages }) {
  return (
    <div className="chat-room">
      {messages.map((message, index) => (
        <div key={index} className="message">
          <p className="sender">{message.sender}</p>
          <p className="text">{message.text}</p>
        </div>
      ))}
    </div>
  );
}

export default ChatRoom;
