angular.module('MeanChat')
.controller('UsersController', UsersController);

UsersController.$inject = ['$http'];

function UsersController($http){
  var self = this;
  self.all = [];
  self.addUser = addUser;
  self.newUser = {};
  self.getUsers = getUsers;
  self.authUser = authUser;
  self.deleteUser = deleteUser;
  // console.log(self.newUser); // test to see if self.newUser is in existence
  getUsers();

  function getUsers(){
    $http
      .get('http://localhost:9000/users')
      .then(function(response){
        self.all = response.data.users;
    });
  }

  function createUser(){
    $http
      .get('http://localhost:9000/users')
      .then(function(response){
        getUsers();
      });
  }

  function addUser(){
    console.log(self.newUser); // test to see if self.newUser has key:values created
    $http
      .post('/users', self.newUser)
      .then(function(response){
        console.log(response);
        getUsers();
    });
    self.newUser = {};
  }

// lookup how to make form submission and grab fields in angular
  function authUser(){
    console.log(self.username, self.password);
    $http
      ({
        url: '/user',
        method: 'POST',
        data: {
          username: self.username,
          password: self.password
        }
    })
      .then(function(response) {
        console.log(response);
        getUsers();
      });
  }

  function deleteUser(user){
    $http
      .delete('http://localhost:9000/users' + user._id)
      .then(function(response){
        var index = self.all.indexOf(user);
        self.all.splice(index, 1);
      });
  }

}
