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
app.use(morgan('dev'));
app.use(express.static(__dirname + "/public"));


app.use(session({
  secret: 'twenty-three skidoo',
  resave: false,
  saveUninitialized: true
}));







app.listen( process.env.PORT || 3000, function () {
    console.log('Running on 3000!');
});

// export app module
module.exports = app;