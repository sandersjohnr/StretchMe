var models  = require('./models'),
    User    = models.users,
    Routine = models.routines,
    Stretch = models.stretches;

var stretches = [
  {
    name: 'Hamstring Stretch',
    band: true,
    roller: false,
    both_sides: true, 
    intro: 'Lay down on your mat.', 
    instruction: 'Begin on your back with your hip and knee bent. Place a belt around your foot. Pull foot towards head until a stretch is felt in the hamstring. Then switch legs. Keep opposite leg flat on surface.',
    setup_time: 20,
    rep_time: 45, 
    rep_num: 2,
    media_url: 'https://www.youtube.com/watch?v=hfvd04VyXbs'
  },
  {
    name: 'Hamstring Wall Stretch',
    band: false,
    roller: false,
    both_sides: true, 
    intro: 'Go to the doorway and place a leg up the wall.', 
    instruction: 'Place a leg up a wall while lying on your back. Your other leg should lay straight on the floor and through a doorway or hall, keeping toe pointed towards ceiling.',
    setup_time: 20,
    rep_time: 120, 
    rep_num: 1,
    media_url: 'https://www.youtube.com/embed/8wz23ONDzUc'
  },
  {
    name: 'Piriformis Stretch',
    band: false,
    roller: false,
    both_sides: true, 
    intro: 'Lay down on your mat.', 
    instruction: 'Bend right knee and cross the left shin over your right thigh, making sure not to twist your ankle. Bring the right knee to your chest and push the left knee away from body. Switch legs.',
    setup_time: 10,
    rep_time: 45, 
    rep_num: 2,
    media_url: 'https://www.youtube.com/embed/eKp2f5-jRbI' 
  },
  {
    name: 'Gluteus Medius Stretch',
    band: false,
    roller: false,
    both_sides: true, 
    intro: 'Lay down on your mat', 
    instruction: 'Hold your knee with your opposite hand and draw your knee up and over towards your opposite shoulder',
    setup_time: 20,
    rep_time: 45, 
    rep_num: 2,
    media_url: 'https://www.youtube.com/embed/RTqqiy7cUL0' 
  },
  {
    name: 'Lower Trunk Rotations',
    band: false,
    roller: false,
    both_sides: false, 
    intro: 'Lay down on your mat', 
    instruction: 'Lying on your back with your knees bent, gently move your knees side to side',
    setup_time: 10,
    rep_time: 5, 
    rep_num: 15,
    media_url: 'https://www.youtube.com/embed/G-sSA5dqpdc'
  },
  {
    name: 'Hip Flexor Stretch',
    band: true,
    roller: false,
    both_sides: false, 
    intro: 'Get up on a raised surface', 
    instruction: 'Bend one knee keeping your foot on the table. Drop your other lef off the side of the table. Use a stretching strap to pull your ankle in towards your buttock',
    setup_time: 20,
    rep_time: 45, 
    rep_num: 2,
    media_url: 'https://www.youtube.com/embed/gMEGo4d_-Vg'
  },
  {
    name: 'Groin Stretch',
    band: false,
    roller: false,
    both_sides: false, 
    intro: 'Lay down on your mat', 
    instruction: 'Lying supine with the knees bent, feet together, let the knees fall out to the side until a stretch is felt through the groin',
    setup_time: 20,
    rep_time: 45, 
    rep_num: 2,
    media_url: "https://www.youtube.com/embed/i1rQgNrh_f8"
  },
  {
    name: 'Pelvic Tilt',
    band: false,
    roller: false,
    both_sides: false, 
    intro: 'Lay down on your mat', 
    instruction: 'Lie on your back with knees comfortably bent. Flatten your back against the table using your stomach muscles to press your spine downwards towards the mat.',
    setup_time: 20,
    rep_time: 3, 
    rep_num: 30,
    media_url: ''
  },
  {
    name: 'Brace Marching',
    band: false,
    roller: false,
    both_sides: false, 
    intro: 'Lay down on your mat', 
    instruction: 'While lying on your back with your knees bent, slowly raise up one foot a few inches keeping your abdominals activated with toes pointed toward the ceiling, and the set it back down. Alternate legs',
    setup_time: 20,
    rep_time: 5, 
    rep_num: 15,
    media_url: 'https://www.youtube.com/embed/gikdpm9oNnk'
  },
  {
    name: 'Muscle Energy',
    band: false,
    roller: false,
    both_sides: false, 
    intro: 'Lay down on your mat', 
    instruction: 'While lying on your back, raise up your knee with your toes pointed toward your nose and press it into the ground. Perform press into knee and table at the same time. Contract abdominals, flattening spine into the floor. Alternate knees.',
    setup_time: 20,
    rep_time: 5, 
    rep_num: 15,
    media_url: 'https://www.youtube.com/embed/_NloUYVLoFI'
  }
];


var seedDatabase = function() {
  stretches.forEach( function(stretchData) {
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
};

seedDatabase();

