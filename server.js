var express       = require('express'),
    app           = express(),
    bodyParser    = require('body-parser'),
    session       = require('express-session'),
    morgan        = require('morgan'),
    path          = require('path'),
    bcrypt        = require('bcrypt'),
    models        = require('./models'),
    // router        = require('./routers')(app),
    userRouter    = require('./routers/user_router.js'),
    routineRouter = require('./routers/routine_router.js'),
    stretchRouter = require('./routers/stretch_router.js');

var User    = models.users;
var Routine = models.routines;
var Stretch = models.stretches;
    
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}
app.use(session({
  secret: 'twenty-three skidoo',
  resave: false,
  saveUninitialized: true
}));
// Set up routes
app.use('/users', userRouter);
app.use('/routines', routineRouter);
app.use('/stretches', stretchRouter);
// Set up front end
app.use(express.static(__dirname + "/public"));

// DEBUG SESSION ##########################
app.get('/debug_session', function (req, res) {
  res.send(req.session);
});


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
app.get('/users', function (req, res) {
  User
  .findAll({ include: [Routine] })
  .then(function (users) {
    res.send(users);
  });
});

app.post('/users', function (req, res) {
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

app.post('/sessions', function (req, res) {
  var loginUsername = req.body.username;
  var loginPassword = req.body.password;

  User
  .findOne({
    where: { username: loginUsername }
  })
  .then(function (user) {
    if (user) {
      var passwordDigest = user.password_digest;
      bcrypt.compare(loginPassword, passwordDigest, function (err, result) {
        if (result) {
          req.session.currentUser = user.id;
          res.send('correct credentials');
        } else {
          res.status(400);
          res.send({
            err: 400,
            msg: 'wrong password'
          });
        }
      });
    } else {
      res.status(400);
      res.send({
        err: 400,
        msg: 'username does not exist'
      });
    }
  });
});


app.get('/current_user', function (req,res) {
  User
  .findOne(req.session.currentUser)
  .then(function (user) {
    res.send(user);
  });
});

app.delete('/sessions', function (req, res) {
  delete req.session.currentUser;
  res.send('Successfully logged out');
});


// Start server
app.listen( process.env.PORT || 3000, function () {
    console.log('Running on 3000!');
});

// Export app module
module.exports = app;