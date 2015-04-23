App.Views.Routine = Backbone.View.extend({

  initialize: function() {
    this.routineTemplate = Handlebars.compile($('#routine-template').html());
    this.render();
  },

  render: function() {
    cl(this.model)
    this.$el.html(this.routineTemplate(this.model.toJSON()));
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
  },

  events: {
    'click .routine-info' : 'setStretchListView',
    'click .play-routine' : 'playRoutine',
    'click .delete-routine' : 'deleteRoutine'
  }

});