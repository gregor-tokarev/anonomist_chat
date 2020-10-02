const express = require('express');
const helmet = require('helmet');
const SocketServer = require('socket.io');
const cors = require('cors')
require('dotenv');


const app = express();
const { setIo } = require('./core/SocketManager');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

const server = app.listen(8000);
const io = new SocketServer(server);
setIo(io);
require('./sockets/mainSocket');
