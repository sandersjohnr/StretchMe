var express       = require('express'),
    session       = require('express-session'),
    bcrypt        = require('bcrypt'),
    // morgan        = require('morgan'),
    models        = require('../models'),
    User          = models.users,
    Routine       = models.routines,
    Stretches     = models.stretches;

var userRouter = express.Router();

// export module
module.exports = userRouter;