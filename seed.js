var models  = require('./models'),
    User    = models.users,
    Routine = models.routines,
    Stretch = models.stretches;

var routines = [
  {
    name: 'Monday morning',
    description: 'Hamstring stretches'
  }
];

var stretches = [
  {
    name: 'Banded hamstring stretch',
    band: true,
    roller: false,
    intro: '', 
    instruction: 'Lie down on your mat and place your right foot in the loop at the end of your band. To begin, lift your leg until you feel a good stretch in your hamstring',
    setup_time: 20,
    rep_time: 60, 
    rep_num: 1,
    both_sides: true, 
    media_url: ''
  }
];



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