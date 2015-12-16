'use strict';
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
// const router = require('./config/routes');
const usersController = require('./controllers/users');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/meanchat');

app.use(bodyParser.json());
app.use(express.static('./public'));
app.use('/node_modules', express.static('./node_modules'));

// GET retrieve and show all users
app.get('/users', function(req, res) {
  res.json(usersController.showAllUsers)
});

// POST create a new user
app.post('/users', function(req, res) {
  console.log(req.body);
  res.json(usersController.createUser(req.body));
});

// PATCH update existing user
app.patch('/users/:id', function(req, res) {
  res.json(usersController.editUser)
});

// DELETE remove specific user from DB
app.delete('/users/:id', function(req, res) {
  res.json(usersController.deleteUser)
});

// GET retrieve and show all chat messages
app.get('/chats', function(req, res) {
  res.json(chatsController.showAllChats)
});

// POST create a new chat message
app.post('/chats', function(req, res) {
  res.json(chatsController.createChat)
});

// DELETE remove a specific chat message from DB
app.delete('/chats/:id', function(req, res) {
  res.json(chatsController.deleteChat)
});


// Testing express route
// app.get('/', function(req, res){
//   // The below literally sends an html string to the browser page
//   // res.send('<h1>Hello world</h1>');
//
//   // The below sends the contents of index.html, from the 'public' directory, to the browser page
//   res.sendFile(__dirname + '/public/index.html');
// });

// 'connection' is a keyword indicating an action has occured
io.on('connection', function(socket){
  console.log('A User Connected');
  // 'chat message' receives the message in the form
  socket.on('chat message', function(msg){
    // this relays the message in the form to the terminal
    console.log('message: ' + msg);
    // this relays the message in the form to the client side
    io.emit('chat message', msg);
  });
  // 'disconnect' appears when a user leaves the server
  socket.on('disconnect', function(){
    console.log('A User Disconnected');
  });
});


// Testing server
// server.listen(9000);

// Allows for Heroku
server.listen(process.env.PORT || 9000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
