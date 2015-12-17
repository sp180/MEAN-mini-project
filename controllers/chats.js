var express = require('express');
var Chat = require('../models/chat');
var router = express.Router();
var app = express();
// var routes = require('../config/routes');

///// create chat (POST http://localhost:9000/chat) /////////////////////
function createChat(req, res) {
  console.log(req.body);
  var chatObj = new Chat({
    username: req.username,
    message: req.message
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


///// delete chat (DELETE http://localhost:9000/chat/delete) ///////////////////
function deleteChat(req, res) {
  console.log('hit delete')
  var chatParams = req.message;
  Chat.findOne({ message: chatParams.chat}, function (err, chat) {
    if (err) {
      console.log('chat not deleted');
      console.log(chat);
      return;
    } Chat.remove(function(err, user) {
      res.send({"record" : "deleted"});
    });
  });
}

module.exports = {
  createChat: createChat,
  showAllChats: showAllChats,
  deleteChat: deleteChat
}
