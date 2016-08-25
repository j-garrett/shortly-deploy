var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var path = require('path');

mongoose.connect('mongodb://localhost/shortly'); //database

var db = {}; 

 //collection (user turned into users)

module.exports = db;
