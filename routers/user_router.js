var express       = require('express'),
    session       = require('express-session'),
    bcrypt        = require('bcrypt'),
    models        = require('../models'),
    User          = models.users,
    Routine       = models.routines,
    Stretches     = models.stretches;

var userRouter = express.Router();

// USER AUTH METHODS ##############################
var restrictAccess = function(req, res, next) {
  var sessionID = parseInt( req.session.currentUser );
  var reqID = parseInt( req.params.id );
  sessionID === reqID ? next() : res.status(401).send({err: 401, msg: 'Access restricted'});
};

var authenticate = function(req, res, next) {
  req.session.currentUser ? next() : res.status(400).send({err: 400, msg: 'LOGIN TROLL'});
};

// USER ROUTES ####################################
userRouter.get('/', function (req, res) {
  User
  .findAll({ include: [Routine] })
  .then(function (users) {
    res.send(users);
  });
});

userRouter.get('/:id', function (req,res) {
  User
  .findOne({ include: Routine })
  .then(function (user) {
    res.send(user);
  });
});

userRouter.post('/', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  bcrypt.hash(password, 10, function (err, hash) {
    User
    .create({
      username: username,
      password_digest: hash
    })
    .then(function (user) {
      res.send(user);
    });
  });
});

userRouter.delete('/:id', function (req, res) {
  User
  .findOne(req.params.id)
  .then(function (user) {
    user.destroy()
    .then(function (user) {
      res.send(user);
    });
  });
});

// export modulezz
module.exports = userRouter;