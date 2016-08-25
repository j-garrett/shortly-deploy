var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var path = require('path');

mongoose.connect('mongodb://localhost/shortly'); //database

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

var urlSchema = new Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number,
  timestamp: {type: Date, default: Date.now }
});

var userSchema = new Schema({
  username: String,
  password: String
});

var User = mongoose.model('user', userSchema); //collection (user turned into users)
new User({username: 'George', password: 'weallare!!'}) // document
  .save()
  .then(function(product) {
    console.log('New user, ' + product + ', created.');
  })
  .catch(function(err) {
    console.log('Error saving user: ', err);
  });


module.exports = db;
