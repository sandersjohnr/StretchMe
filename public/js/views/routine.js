App.Views.Routine = Backbone.View.extend({

  initialize: function() {
    cl('created: routine view');
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
    App.playView.setStretches(this.collection);
  },

  events: {
    'click .routine-info' : 'setStretchListView',
    'click .play-routine' : 'playRoutine'
  }

});