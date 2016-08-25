var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');

var db = require('../app/config');
var User = require('../app/models/user');
var Link = require('../app/models/link');

exports.renderIndex = function(req, res) {
  res.render('index');
};

exports.signupUserForm = function(req, res) {
  res.render('signup');
};

exports.loginUserForm = function(req, res) {
  res.render('login');
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function() {
    res.redirect('/login');
  });
};

exports.fetchLinks = function(req, res) {
  Link.find().then(function(links) {
    res.status(200).send(links);
  });
};

exports.saveLink = function(req, res) {
  var uri = req.body.url;

  if (!util.isValidUrl(uri)) {
    console.log('Not a valid url: ', uri);
    return res.sendStatus(404);
  }
  Link 
    .findOne({url: uri}) // search for existing link with query
    .then(function(link) { 
      if (link) { // if link does exist then do one thing
        res.status(200).send(link); // send back object
      } else { // if it DOESN'T exist then create it!
        util.getUrlTitle(uri, function(err, title) {
          if (err) {
            return res.sendStatus(404);
          }
          var newLink = new Link({
            url: uri,
            title: title,
            baseUrl: req.headers.origin
          });
          newLink
            .save()
            .then(function(newLink) {
              res.status(200).send(newLink);
            });
        });
      }
    });
};

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User
  .findOne({username: username}) //will return an obj w/ then method
  .then(function(user) {
    if (!user) {
      res.redirect('/login');
    } else if (user.comparePassword(password, user.password)) {
      util.createSession(req, res, user);
    } else {
      res.redirect('/login');
    }
  });
};

exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User
  .findOne({username: username})
  .then(function(user) {
    if (!user) {
      //need to hash password
      var newUser = new User({
        username: username,
        password: password
      });
      newUser.hashPassword()
        .save() // will return a promise
        .then(function(newUser) {
          util.createSession(req, res, newUser);
        });
    } else {
      console.log('Account already exists');
      res.redirect('/signup');
    }
  });
};

exports.navToLink = function(req, res) {
  Link
    .findOne({ code: req.params[0] })
    .then(function(link) {
      if (!link) {
        res.redirect('/');
      } else {
        link.visits++;
        link
          .save()
          .then(function() {
            return res.redirect(link.get('url'));
          });
      }
    });
};