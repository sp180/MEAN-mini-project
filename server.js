'use strict';
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', function(){ /* … */ });
server.listen(3000);
