var express       = require('express'),
    models        = require('../models'),
    // session       = require('express-session'),
    User          = models.users,
    Routine       = models.routines,
    Stretch       = models.stretches;

var routineRouter = express.Router();

// DEBUG ROUTINES #################################
routineRouter.get('/debug', function (req, res) {
  Routine
  .findAll()
  .then(function (routines) {
    res.send(routines);
  });
});

// GET ALL ROUTINES FOR SESSION USER #################################
routineRouter.get('/', function (req, res) {
  Routine
  .findAll({
    where: { user_id: req.session.currentUser },
    include: [Stretch]
  })
  .then(function (routines) {
    res.send(routines);
  });
});

// CREATE NEW ROUTINE #########################################
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

// GET ROUTINE BY ID ##########################################
routineRouter.get('/:id', function (req, res) {
  Routine
  .findOne(req.params.id)
  .then(function (routine) {
    res.send(routine);
  });
});

// EDIT ROUTINE #########################################
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

// GET STRETCHES BY ROUTINE #########################################

// routineRouter.get('/:id/stretches', function (req, res) {
//   Routine
//   .findOne(req.params.id)
//   .then(function (routine) {
//     routine
//     .findStretch()
//     .then(function(stretches) {
//       res.send(stretches)
//     });
//   });
// });



// CREATE NEW STRETCH FOR PARTICULAR ROUTINE #########################################
routineRouter.post('/:id/add_stretch', function (req, res) {
  Routine
  .findOne(req.params.id)
  .then(function (routine) {
    Stretch
    .create({
      name: req.body.name,
      band: req.body.band,
      roller: req.body.roller,
      both_sides: req.body.both_sides, 
      intro: req.body.intro, 
      instruction: req.body.instruction,
      setup_time: req.body.setup_time,
      rep_time: req.body.rep_time, 
      rep_num: req.body.rep_num,
      media_url: req.body.media_url
    })
    .then(function (stretch) {
      routine.addStretch(stretch);
      res.send(stretch);
    });
  });
});


// export module
module.exports = routineRouter;