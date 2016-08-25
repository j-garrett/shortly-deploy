var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var path = require('path');

mongoose.connect('mongodb://localhost/shortly'); //database

var db = {}; 

var urlSchema = new Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number,
  timestamp: {type: Date, default: Date.now }
});

db.Url = mongoose.model('url', urlSchema);

var userSchema = new Schema({
  username: String,
  password: String
});

db.User = mongoose.model('user', userSchema); //collection (user turned into users)

module.exports = db;
