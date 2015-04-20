var express       = require('express'),
    models        = require('../models'),
    User          = models.users,
    Routine       = models.routines,
    Stretch       = models.stretch;

var routineRouter = express.Router();

// GET ALL ROUTINES FOR SESSION USER #################################
routineRouter.get('/', function (req, res) {
  Routine
  .findAll({
    where: { user_id: req.session.currentUser }
  })
  .then(function (routines) {
    res.send(routines);
  });
});

// ROUTINE ROUTES ##########################################
routineRouter.get('/:id', function (req, res) {
  Routine
  .findOne(req.params.id)
  .then(function (routine) {
    res.send(routine);
  });
});

routineRouter.post('/', /*authenticate, restrictAccess, */function (req, res) {
  Routine
  .create({
    name: req.body.name,
    description: req.body.description,
    user_id: req.session.currentUser
  })
  .then(function (routine) {
    res.send(routine);
  });
});

routineRouter.put('/:id', function (req, res) {
  Routine
  .findOne(req.params.id)
  .then(function (routine) {
    routine
    .update(req.body)
    .then(function (updatedRoutine) {
      res.send(updatedRoutine);
    });
  });
});


// export module
module.exports = routineRouter;