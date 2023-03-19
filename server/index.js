// Required packages
const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

// Parse incoming requests
app.use(express.json());
app.use(cors());
