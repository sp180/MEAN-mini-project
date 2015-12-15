angular.module('MeanChat')
.controller('UsersController', UsersController);

UsersController.$inject = ['$http'];

function UsersController($http){
  var self = this;
  self.all = [];
  self.addUser = addUser;
  self.newUser = {};
  self.getUsers = getUsers;
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
      .post('http://localhost:9000/users', self.newUser)
      .then(function(response){
        getUsers();
    });
    self.newUser = {};
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
