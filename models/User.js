var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

// For Login and Authentication
userSchema.pre('save', function(next) {
  var currentUser = this;
  if (!currentUser.isModified('password')) return next(); ///// if password new/modified hash password
  bcrypt.genSalt(5, function(err, salt) { ///// generate salt
    if (err) return next(err);
    bcrypt.hash(currentUser.password, salt, function(err, hash) { ///// salt password
      if (err) return next (err);
      currentUser.password = hash;
      next();
    });
  });
});

userSchema.methods.authenticate = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    callback(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
