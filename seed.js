var models  = require('./models'),
    User    = models.users,
    Routine = models.routines,
    Stretch = models.stretches;

var routines = {
  name: 'Monday morning',
  description: 'Lower back and hamstrings'
}






module.exports = function (done) {
  User.destroy({ truncate: true}).then(function() {
    Routine.destroy({ truncate: true}).then(function() {
      Stretch.destroy({ truncate: true}).then(function() {
        User.bulkCreate(users).then(function() {
          Routine.bulkCreate(routines).then(function() {
            Stretch.bulkCreate(stretches).then(function() {
              done();
            });
          });
        });
      });
    });
  });
};