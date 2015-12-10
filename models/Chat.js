var mongoose = require('mongoose');

var chatSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  message: {type: String, required: true, unique: true}
});

module.exports = mongoose.model('Chat', chatSchema);
