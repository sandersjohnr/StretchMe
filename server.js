
/*
var application_root = __dirname,
    express          = require('express'),
    bodyParser       = require('body-parser'),
    path             = require('path'),
    logger           = require('morgan'),
    campusRouter     = require('./routers/campus_router.js'),
    courseRouter     = require('./routers/course_router.js'),
    studentRouter    = require('./routers/student_router.js');

var app = express();

// Server Configuration
if (process.env.NODE_ENV !== "test") {
  app.use( logger('dev') );
}
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );
app.use( express.static( path.join( application_root, 'public' )));
app.use( express.static( path.join( application_root, 'browser' )));

app.use('/students', studentRouter);
app.use('/courses', courseRouter);
app.use('/campuses', campusRouter);


// Export app as module
module.exports = app;
*/

var express       = require('express'),
    morgan        = require('morgan'),
    bodyParser    = require('body-parser'),
    path          = require('path'),
    models        = require('./models'),
    userRouter    = require('./routers/user_router.js'),
    routineRouter = require('./routers/routine_router.js'),
    stretchRouter = require('./routers/stretchRouter.js');
    
var app           = express();

app.use(bodyParser());
app.use(morgan('dev'));
app.use(express.static(__dirname + "/public"));










app.listen( process.env.PORT || 3000, function () {
    console.log('Running on 3000!');
});

// export app module
module.exports = app;