var express       = require('express'),
    models        = require('../models'),
    User          = models.users,
    Routine       = models.routines,
    Stretch       = models.routines;

var routineRouter = express.Router();

// DEBUG ROUTINES ##########################################
routineRouter.get('/', function (req, res) {
  Routine
  .findAll({ include: [Stretch] })
  .then(function (routines) {
    res.send(routines);
  });
});

// ROUTINE ROUTES ##########################################
routineRouter.get('/:id', function (req, res) {
  Routine
  .findOne({ 
    where: { id: req.params.id }
  })
  .then(function (routine) {
    res.send(routine);
  });
});

routineRouter.post('/', /*authenticate, restrictAccess, */function (req, res) {
  Routine
  .create()
})



// export module
module.exports = routineRouter;