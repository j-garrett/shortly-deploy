var db = require('../config');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var userSchema = new Schema({
  username: String,
  password: String
});

userSchema.methods.comparePassword = function (attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, passwordHash, function(err, isMatch) {
    callback(isMatch);
  });
}
var User = mongoose.model('user', userSchema);

module.exports = User;
