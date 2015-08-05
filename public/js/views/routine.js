App.Views.Routine = Backbone.View.extend({

  initialize: function() {
    this.routineTemplate = Handlebars.compile($('#routine-template').html());
    this.render();
  },

  render: function() {
    this.$el.html(this.routineTemplate(this.model.toJSON()));
    return this;
  },

  setStretchListView: function() {
    App.routineList.collection.reset(this.model);
    App.stretchList.collection.reset(this.collection);
  },

  playRoutine: function() {
    $('#all-stretches').empty();
    App.playView.setStretches(this.collection);
  },

  deleteRoutine: function() {
    this.model.destroy();
    // $.ajax({
    //   url: '/routines/'+this.model.id,
    //   method: 'DELETE'
    // }).done( App.routineList.fetchAndShowRoutines );
  },

  events: {
    'click .routine-info' : 'setStretchListView',
    'click .play-routine' : 'playRoutine',
    'click .delete-routine' : 'deleteRoutine'
  }

});