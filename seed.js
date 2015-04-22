var models  = require('./models'),
    User    = models.users,
    Routine = models.routines,
    Stretch = models.stretches;

// var users = [
//   {
//     name: 'bobojones',
//     password_digest: '$2a$10$mKNtZmDk7UZS7WoPk7zf.eS4AewqmpNxd2kgWvFNX6JMhOmO8sWky'
//   }
// ];
// var routines = [
//   {
//     name: 'Mondaymorning',
//     description: 'Hamstring stretches'
//   }
// ];

var stretches = [
  {
    name: 'Banded hamstring stretch',
    band: true,
    roller: false,
    both_sides: true, 
    intro: '', 
    instruction: 'Lie down on your mat and place your right foot in the loop at the end of your band. To begin, lift your leg until you feel a good stretch in your hamstring',
    setup_time: 20,
    rep_time: 60, 
    rep_num: 1,
    media_url: 'https://www.youtube.com/watch?v=hfvd04VyXbs'
  },
  {
    name: 'Wall Squat',
    band: false,
    roller: false,
    both_sides: false, 
    intro: 'Stand against the wall', 
    instruction: 'Blah blah blah',
    setup_time: 10,
    rep_time: 10, 
    rep_num: 10,
    media_url: 'https://www.youtube.com/watch?v=hfvd04VyXbs'
  },
  {
    name: ,
    band: ,
    roller: ,
    both_sides: , 
    intro: , 
    instruction: ,
    setup_time: ,
    rep_time: , 
    rep_num: ,
    media_url: 
  },
  {
    name: ,
    band: ,
    roller: ,
    both_sides: , 
    intro: , 
    instruction: ,
    setup_time: ,
    rep_time: , 
    rep_num: ,
    media_url: 
  },
  {
    name: ,
    band: ,
    roller: ,
    both_sides: , 
    intro: , 
    instruction: ,
    setup_time: ,
    rep_time: , 
    rep_num: ,
    media_url: 
  },
  {
    name: ,
    band: ,
    roller: ,
    both_sides: , 
    intro: , 
    instruction: ,
    setup_time: ,
    rep_time: , 
    rep_num: ,
    media_url: 
  },
  {
    name: ,
    band: ,
    roller: ,
    both_sides: , 
    intro: , 
    instruction: ,
    setup_time: ,
    rep_time: , 
    rep_num: ,
    media_url: 
  },
  {
    name: ,
    band: ,
    roller: ,
    both_sides: , 
    intro: , 
    instruction: ,
    setup_time: ,
    rep_time: , 
    rep_num: ,
    media_url: 
  },
  {
    name: ,
    band: ,
    roller: ,
    both_sides: , 
    intro: , 
    instruction: ,
    setup_time: ,
    rep_time: , 
    rep_num: ,
    media_url: 
  },
  {
    name: ,
    band: ,
    roller: ,
    both_sides: , 
    intro: , 
    instruction: ,
    setup_time: ,
    rep_time: , 
    rep_num: ,
    media_url: 
  }
];
/*
var seedDatabase = function () {
  users.forEach( function (userData) {
    User.create({
      username: userData.username,
      password_digest: userData.password_digest
    })
    .then(function(user) {
      routines.forEach( function (routineData) {
        Routine.create({
          name: routineData.name,
          description: routineData.description,
          user_id: user.id
        })
        .then(function(routine) {
          stretches.forEach( function (stretchData) {
            Stretch.create({
              name: stretchData.name,
              band: stretchData.band,
              roller: stretchData.roller,
              intro: stretchData.intro, 
              instruction: stretchData.instruction,
              setup_time: stretchData.setup_time,
              rep_time: stretchData.rep_time, 
              rep_num: stretchData.rep_num,
              both_sides: stretchData.both_sides, 
              media_url: stretchData.media_url
            });
          });
        });
      });
    });
  });
};
*/
seedDatabase();


/*
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
*/