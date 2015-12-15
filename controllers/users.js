var express = require('express');
var User = require('../models/user');
var router = express.Router();
var app = express();
// var routes = require('../config/routes');

///// create user (POST http://localhost:9000/user/signup) /////////////////////
function createUser(req, res) {
  console.log("signup route hit");
  console.log(req.body);
  var userObj = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  console.log(req.body);
  console.log('inside createUser');
  userObj.save(function(err, user) {
    if (err) {
      console.log('about to error yo');
      return res.status(401).send({message: err.errmsg});
    } else {
      return res.status(200).send(user);
    }
    console.log(user);
  });
}

///// show all users (GET http://localhost:9000/api/users) ////////////////////
function showAllUsers(req, res) {
  console.log('in showAllUsers')
  User.find({}, function(err, users) {
    console.log('hit /users/show')
    res.send(users);
  });
}

///// show a user (GET http://localhost:9000/user/user) ////////////////////
function getUser(req, res) {
  var userParams = req.body.user;
  User.findOne({email: userParams.email}, function(err, user) {
    console.log('hit /users/show')
    res.send(user);
  });
}

///// edit user (PUT http://localhost:9000/user/edit) //////////////////////////
function editUser(req, res) {
  var userParams = req.body.user;
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
  var userParams = req.body.username;
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
