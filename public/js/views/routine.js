App.Views.Routine = Backbone.View.extend({

  initialize: function() {
    cl('created: routine view');
    this.routineTemplate = Handlebars.compile($('#routine-template').html());
    this.render();
  },

  render: function() {
    cl(this.model)
    this.$el.html(this.routineTemplate(this.model.toJSON()));
    this.$('.routine-nav').hide();
  },

  showButtons: function() {
    this.$('.routine-nav').show();
  },

  setStretchListView: function() {
    this.showButtons();
    App.routineList.collection.reset(this.model);
    App.stretchList.collection.reset(this.collection);
  },  

  events: {
    'click .routine' : 'setStretchListView'
  }

});