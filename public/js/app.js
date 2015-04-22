App = {
  Models: {},
  Collections: {},
  Views: {}
};


var utter = function (text) {
  var msg = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(msg);  
};

utter('Shit be fucked')
$(function() {

  $.post('/sessions', {username: 'sanders', password: 'resipsa'}).done(function(){

    App.userView = new App.Views.User;
    App.routines = new App.Collections.Routine;
    App.routineList = new App.Views.RoutineList({collection: App.routines });
    // App.stretchList = new App.Views.StretchList;
    // App.stretchModal = new App.Views.StretchFull;

  });

  
});


// Hack city, betch
var c = console;
c.l = c.log;
var cl = console.log.bind(console);
