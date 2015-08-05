var express       = require('express'),
    app           = express(),
    bodyParser    = require('body-parser'),
    session       = require('express-session'),
    morgan        = require('morgan'),
    path          = require('path'),
    bcrypt        = require('bcrypt'),
    models        = require('./models'),
    userRouter    = require('./routers/user_router.js'),
    routineRouter = require('./routers/routine_router.js'),
    stretchRouter = require('./routers/stretch_router.js'),
    voiceRouter   = require('./routers/voice_router.js');


// Define models
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
app.use('/voice', voiceRouter);

// Set up front end
app.use(express.static(__dirname + "/public"));


// DEBUG SESSION ##########################
app.get('/debug_session', function (req, res) {
  res.send(req.session);
});

app.get('/current_user', function (req,res) {
  User
  .findOne(req.session.currentUser)
  .then(function (user) {
    res.send(user);
  });
});

app.post('/sessions', function (req, res) {
  User
  .findOne({
    where: { username: req.body.username }
  })
  .then(function (user) {
    if (user) {
      var passwordDigest = user.password_digest;
      bcrypt.compare(req.body.password, user.password_digest, function (err, result) {
        if (result) {
          req.session.currentUser = user.id;
          res.send('correct credentials');
        } else {
          res.status(400);
          res.send({ err: 400, msg: 'wrong password' });
        }
      });
    } else {
      res.status(400);
      res.send({ err: 400, msg: 'username does not exist' });
    }
  });
});

app.delete('/sessions', function (req, res) {
  delete req.session.currentUser;
  res.send('Successfully logged out');
});

// Start server
app.listen( process.env.PORT || 8080, function () {
  console.log('Running on 8080!');
});

// Export app module
module.exports = app;