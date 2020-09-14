const express = require('express');
const helmet = require('helmet');
const SocketServer = require('socket.io');
require('dotenv');


const app = express();
const { setIo } = require('./core/SocketManager');


const server = app.listen(8000);
const io = new SocketServer(server);
setIo(io);
require('./sockets/index');
