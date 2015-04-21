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

  var utter = function(text) {
    var msg = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(msg);
  };

  utter('Welcome to stretch me bro')
  

});


// Hack city, betch
var c = console;
c.l = c.log;
var cl = console.log.bind(console);
