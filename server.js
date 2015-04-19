var express       = require('express'),
    session       = require('express-session'),
    morgan        = require('morgan'),
    bodyParser    = require('body-parser'),
    path          = require('path'),
    bcrypt        = require('bcrypt'),
    models        = require('./models'),
    userRouter    = require('./routers/user_router.js'),
    routineRouter = require('./routers/routine_router.js'),
    stretchRouter = require('./routers/stretchRouter.js');
    
var app           = express();

app.use(bodyParser());

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}
app.use(session({
  secret: 'twenty-three skidoo',
  resave: false,
  saveUninitialized: true
}));

app.use('/users', userRouter);
app.use('/routines', routineRouter);
app.use('/stretches', stretchRouter);

app.use(express.static(__dirname + "/public"));

app.listen( process.env.PORT || 3000, function () {
    console.log('Running on 3000!');
});

// export app module
module.exports = app;