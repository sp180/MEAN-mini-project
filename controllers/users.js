var express = require('express');
var User = require('../models/user');
var router = express.Router();
var app = express();
// var routes = require('../config/routes');

///// create user (POST http://localhost:9000/user/signup) /////////////////////
function createUser(req, res) {
  var userObj = new User({
    username: req.username,
    email: req.email,
    password: req.password
  });
  console.log(userObj);
  userObj.save(function(err, user) {
    if (err) {
      console.log('if this shows up, err is in the wrong spot '+err)
      // return res.status(401).send({message: err.errmsg});
    } else {
      console.log('Success! User Saved!')
      // return res.status(200).send(user);
    }
  });
}

///// show all users (GET http://localhost:9000/users) ////////////////////
function showAllUsers(req, res) {
  console.log('in showAllUsers')
  User.find({}, function(err, users) {
    console.log('hit /users/show')
    res.send(users);
  });
}

///// show a user (GET http://localhost:9000/user/user) ////////////////////
function getUser(req, res) {
  var userParams = req.user;
  User.findOne({email: userParams.email}, function(err, user) {
    console.log('hit /users/show')
    res.send(user);
  });
}

///// edit user (PUT http://localhost:9000/user/edit) //////////////////////////
function editUser(req, res) {
  var userParams = req.user;
  User.findOne({email: userParams.email} , function (err, user) {
    user.update(
      {email: userParams.email},
      {email: userParams.newEmail, username: userParams.newUserName},
      function (err, user) {
        resend.send(user);
      }
    )
  })
}

///// delete user (DELETE http://localhost:9000/user/delete) ///////////////////
function deleteUser(req, res) {
  console.log('hit delete')
  var userParams = req.username;
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
  createUser: createUser,
  showAllUsers: showAllUsers,
  editUser: editUser,
  deleteUser: deleteUser
}
