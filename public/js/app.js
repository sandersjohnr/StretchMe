App = {
  Models: {},
  Collections: {},
  Views: {}
};

function utter(text) {
  var msg = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(msg);  
};

utter('Shit be fucked, motherfucker')

$(function() {

  $.post('/sessions', {username: 'sanders', password: 'resipsa'}).done(function(){

    App.userView = new App.Views.User();
    App.playView = new App.Views.PlayRoutine({ collection: new App.Collections.Stretch });
    App.stretchList = new App.Views.StretchList({ collection: new App.Collections.Stretch });
    App.routineList = new App.Views.RoutineList({ collection: new App.Collections.Routine });
    App.stretch = new App.Models.Stretch();
    App.stretchModal = new App.Views.StretchModal({ model: App.stretch });


  });

  
});


// Hack city, betch
var c = console;
c.l = c.log;
var cl = console.log.bind(console);
