// Required packages
const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

// Parse incoming requests
app.use(express.json());
app.use(cors());

app.get('/messages', (req, res) => {
  // Code to retrieve messages
});

app.post('/messages', (req, res) => {
  // Code to add a new message
});

// Server instance and listen for incoming requests
const server = http.createServer(app);
const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
