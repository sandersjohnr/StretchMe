App.Views.RoutineColl = Backbone.View.extend({

  el: '#main',

  initialize: function() {
    cl('created: routine collection view');
    this.routineTemplate = Handlebars.compile($('#routine-list-template').html());
    this.renderRoutineList();
  },

  renderRoutineList: function() {
    cl('rendering routine list')
    
  },

  events: {}

});