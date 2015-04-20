var express       = require('express'),
    models        = require('../models'),
    User          = models.users,
    Routine       = models.routines,
    Stretch       = models.stretches;

var stretchRouter = express.Router();


stretchRouter.get('/', function (req, res) {
  Stretch
  .findAll()
  .then(function (stretches) {
    res.send(stretches);
  });
});






// export module
module.exports = stretchRouter;