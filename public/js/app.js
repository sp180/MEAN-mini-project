console.log("app.js is loaded");

var socket = io();
var form = document.getElementById('form');
form.addEventListener('submit', function(e){
  // preventDefault() prevents the default action addEventListener takes when invoked,
  // which is to post a form and access an url route
  e.preventDefault();
  // the below sends what is in the input field to socket.on in server.js through 'chat message'
  socket.emit('chat message', document.getElementById('m').value);
  // the below effectively clears out the input field
  document.getElementById('m').value = '';
});
// the parameter for socket.on, in this case 'msg', returns what was
// what was emitted from socket.emit through 'chat message' in the anonymous function above
socket.on('chat message', function(msg) {
  // creates a <li></li> in the ether and is assigned to the variable 'listItem', waiting to be appended
  var listItem = document.createElement('li');
  // below, 'msg' contains whatever was typed in the input field, as well as what was transmitted, and
  // is inserted between the list item tags that 'listItem' represents e.g. <li> 'msg' </li>
  listItem.innerHTML = msg;
  // at this point, 'listItem' is now <li> 'msg' </li>. It is being appended to the unordered list
  // which has the id 'messages' assigned to it. This is how the unordered list is found and accessed
  document.getElementById('messages').appendChild(listItem);
});

// jQuery equivalent below, commented out
////////////////////////////////////////////////
// $('form').submit(function(){
//   socket.emit('chat message', $('#m').val());
//   $('#m').val('');
//   return false;
// });
// socket.on('chat message', function(msg){
//   $('#messages').append($('<li>').text(msg));
// });
////////////////////////////////////////////////
