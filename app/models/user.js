var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');




// new User({username: 'George', password: 'weallare!!'}) // document
//   .save()
//   .then(function(product) {
//     console.log('New user, ' + product + ', created.');
//   })
//   .catch(function(err) {
//     console.log('Error saving user: ', err);
//   });






// it takes a username and returns the user
// it hashes a received password
// compares password to the hash

var User = function (username, password) {
  this.password = password;
  this.username = username;
  return this.hashPassword().then( this.createUser() );
};

console.log(User('jon', 'password'));  

User.prototype.createUser = function() {
  return new db.User({username: this.username, password: this.password}).save();  
};

User.prototype.hashPassword = function () {
  // body...
  var cipher = Promise.promisify(bcrypt.hash);
  cipher(this.password, null, null).bind(this)
    .then( (hash) => this.password = hash );
  return cipher;
};

User.prototype.checkPassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    callback(isMatch);
  });
};

// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function() {
//     this.on('creating', this.hashPassword);
//   },

// });

module.exports = User;
