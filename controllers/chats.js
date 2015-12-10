var express = require('express');
var Chat = require('../models/chat');
var router = express.Router();
var app = express();
var routes = require('../routes/chat_routes');

///// create chat (POST http://localhost:9000/chat) /////////////////////
function createChat(req, res) {
  console.log("signup route hit");
  console.log(req.body);
  var userObj = new Chat({
    username: req.body.username,
    message: req.body.message
  });
  console.log(req.body);
  console.log('inside createChat');
  chatObj.save(function(err, user) {
    if (err) {
      console.log('about to error yo');
      return res.status(401).send({message: err.errmsg});
    } else {
      return res.status(200).send(chat);
    }
    console.log(chat);
  });
}

///// show all chats (GET http://localhost:9000/chat/chats) ////////////////////
function showAllChats(req, res) {
  Chat.find({}, function(err, chats) {
    console.log('hit /chats/show')
    res.send(chats);
  });
}


///// delete user (DELETE http://localhost:9000/user/delete) ///////////////////
function deleteUser(req, res) {
  console.log('hit delete')
  let userParams = req.body.username;
  User.findOne({ username: userParams.username}, function (err, user) {
    if (err) {
      console.log('user not deleted');
      console.log(user);
      return;
    } User.remove(function(err, user) {
      res.send({"record" : "deleted"});
    });
  });
}

module.exports = {
  createChat: createChat,
  showAllChats: showAllChats,
  deleteChat: deleteChat
}
