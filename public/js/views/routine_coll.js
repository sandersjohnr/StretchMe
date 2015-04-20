App.Views.RoutineColl = Backbone.View.extend({

  el: '#main',

  initialize: function(user) {
    cl('created: routine collection view');
    this.routineTemplate = Handlebars.compile($('#routine-list-template').html());
    this.collection = new App.Collections.Routine;
    this.collection.fetch({ success: function() {
      this.renderRoutineList();
    }.bind(this)});

    // this.listenTo(this.collection, 'reset', this.renderRoutineList);
  },

  renderRoutineList: function() {
    cl('rendering routine list');
    // this.$el.html( this.routineTemplate( this.collection ) );
    this.collection.each( this.renderRoutine, this );
  },

  renderRoutine: function(routine) {
    this.$el.append( this.routineTemplate( routine.toJSON() ) );
  },

  setCurrentRoutine: function() {

  },

  events: {
    'click .routine' : 'setCurrentRoutine'
  }

});