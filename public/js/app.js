App = {
  Models: {},
  Collections: {},
  Views: {}
};

$(function() {

  $.post('/sessions', {username: 'sanders', password: 'resipsa'}).done(function(){

    App.userView = new App.Views.User;
    // App.routines = new App.Collections.Routine;

  });

  var msg = new SpeechSynthesisUtterance('Yippy-kai-yay motherfucker');
  speechSynthesis.speak(msg);

});


// Hack city, betch
var c = console;
c.l = c.log;
var cl = console.log.bind(console);
