var express       = require('express'),
    session       = require('express-session'),
    bcrypt        = require('bcrypt'),
    // morgan        = require('morgan'),
    models        = require('../models'),
    User          = models.users,
    Routine       = models.routines,
    Stretches     = models.stretches;

var userRouter = express.Router();

// var app = express();
// app.use('bcrypt');
// app.use(session({
//   secret: 'twenty-three skidoo',
//   resave: false,
//   saveUninitialized: true
// }));

// userRouter.get('/', function (req, res) {
//   User
//   .findAll()
//   .then(function (users) {
//     res.send(users);
//   });
// });


// userRouter.post()

// export module
module.exports = userRouter;