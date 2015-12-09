var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

var usersController = require('../controllers/users');

// http://127.0.0.1:9000/users
router.route('/users')

  //GET all users
  .get(usersController.getAll)

  //POST a new users
  .post(usersController.createUser);


router.route('/users/:id')

  // GET return specific users
  .get(usersController.getUser)

  // PATCH update existing users
  .patch(usersController.updateUser)

  // DELETE remove specific users from DB
  .delete(usersController.removeUser);


module.exports = router
