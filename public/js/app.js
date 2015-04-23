App = {
  Models: {},
  Collections: {},
  Views: {}
};

function utter(text) {
  var msg = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(msg);  
};

utter('Welcome to stretch me bro!')

$(function() {

  App.userView     = new App.Views.User();
  App.playView     = new App.Views.PlayRoutine({ collection: new App.Collections.Stretch });
  App.stretchList  = new App.Views.StretchList({ collection: new App.Collections.Stretch });
  App.routineList  = new App.Views.RoutineList({ collection: new App.Collections.Routine });
  App.stretch      = new App.Models.Stretch();
  App.stretchModal = new App.Views.StretchModal({ model: App.stretch });
  App.allStretches = new App.Views.StretchAll({ collection: new App.Collections.StretchesAll });
  
});


var c = console;
c.l = c.log;
var cl = console.log.bind(console);
