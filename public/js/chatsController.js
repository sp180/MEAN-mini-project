angular.module('MeanChat')
.controller('ChatsController', ChatsController);

ChatsController.$inject = ['$http'];

function ChatsController($http){
  var self = this;
  self.all = [];
  self.addChat = addChat;
  self.newChat = {};
  self.getChats = getChats;
  self.deleteChat = deleteChat;
  self.sendMessage = sendMessage;
  self.messages=[];
  self.message;
  getChats();

  function getChats(){
    $http
      .get('/chats')
      .then(function(response){
        self.all = response.data.chats;
    });
  }

  // function createChat(){
  //   $http
  //     .get('http://localhost:9000/chats')
  //     .then(function(response){
  //       getChats();
  //     });
  // }

  function addChat(){
    console.log(self.newChat);
    $http
      .post('/chats', self.newChat)
      .then(function(response){
        console.log(response);
        getChats();
    });
    self.newChat = {};
  }

  function deleteChat(chat){
    $http
      .delete('/chats' + chat._id)
      .then(function(response){
        var index = self.all.indexOf(Chat);
        self.all.splice(index, 1);
      });
  }

  function sendMessage(){
    console.log(self.message)
    self.messages.push(self.message)
  }

}
