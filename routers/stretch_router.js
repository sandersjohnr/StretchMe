var express       = require('express'),
    models        = require('../models'),
    User          = models.users,
    Routine       = models.routines,
    Stretch       = models.stretches;

var stretchRouter = express.Router();

stretchRouter.get('/', function (req, res) {
  Stretch
  .findAll({ include: [Routine] })
  .then(function (stretches) {
    res.send(stretches);
  });
});

stretchRouter.post('/', function (req, res) {
  Stretch
  .create(req.body)
  .then(function(stretch) {
    res.send(stretch);
  });
});

stretchRouter.delete('/:id', function (req, res) {
  Stretch
  .findOne(req.params.id)
  .then(function(stretch) {
    stretch
    .destroy()
    .then(function(stretch){
      res.send(stretch);
    });
  });
});

// export module
module.exports = stretchRouter;