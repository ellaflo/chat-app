// Required packages
const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

// Parse incoming requests
app.use(express.json());
app.use(cors());

// Server instance and listen for incoming requests
const server = http.createServer(app);
const io = socketIo(server); // Create a new instance of socket.io and pass in the http server object

const port = process.env.PORT || 5001;

// Keep track of all connected sockets
let sockets = [];

io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Add the socket to the array of connected sockets
  sockets.push(socket);

  // Listen for the 'join' event to join a room
  socket.on('join', (room) => {
    socket.join(room);
    console.log(`Client ${socket.id} joined room ${room}`);
  });

  // Listen for the 'message' event to send a message to a room
  socket.on('message', (data) => {
    // Get the room from the message data
    const room = data.room;

    // Send the message to the room
    io.to(room).emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);

    // Remove the socket from the array of connected sockets
    sockets = sockets.filter((s) => s.id !== socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
