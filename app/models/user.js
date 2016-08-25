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
  return bcrypt.compareSync(attemptedPassword, this.password);
};

userSchema.methods.hashPassword = function () {
  this.password = bcrypt.hashSync(this.password);
  return this;
};

var User = mongoose.model('user', userSchema);

module.exports = User;
