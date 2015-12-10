var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

var usersController = require('../controllers/users');

// http://127.0.0.1:9000/users
router.route('/users')
  //GET all users
  .get(usersController.getAll)
  //POST new users
  .post(usersController.createUser);

router.route('/users/:id')
  // GET return specific users
  .get(usersController.getUser)
  // PATCH update existing users
  .patch(usersController.updateUser)
  // DELETE remove specific users from DB
  .delete(usersController.removeUser);

var chatsController = require('../controllers/chats');

// http://127.0.0.1:9000/chats
router.route('/chats')
  //GET all chats
  .get(chatsController.getAll)
  //POST new chats
  .post(chatsController.createChat);

router.route('/chats/:id')
  // GET return specific chats
  .get(chatsController.getChat)
  // PATCH update existing chats
  .patch(chatsController.updateChat)
  // DELETE remove specific chats from DB
  .delete(chatsController.removeChat);

module.exports = router
