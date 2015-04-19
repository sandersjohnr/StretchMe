var express       = require('express'),
    session       = require('express-session'),
    bcrypt        = require('bcrypt'),
    morgan        = require('morgan'),
    models        = require('../models'),
    User          = models.users,
    Routine       = models.routines,
    Stretches     = models.routines;

var userRouter = express.Router();


app.use('bcrypt');

app.use(session({
  secret: 'twenty-three skidoo',
  resave: false,
  saveUninitialized: true
}));








// export module
module.exports = userRouter;