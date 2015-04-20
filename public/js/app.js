App = {
  Models: {},
  Collections: {},
  Views: {}
};

$(function() {

  $.post('/sessions', {username: 'bobojones', password: 'poop'}).done(function(){

    App.userView = new App.Views.User();
  });
  // debugger;
});


// Hack city, betch
var c = console;
c.l = c.log;
var cl = console.log.bind(console);
