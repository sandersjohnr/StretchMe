App.Views.Routine = Backbone.View.extend({
  initialize: function() {
    cl('created: routine view');
    this.routineTemplate = Handlebars.compile($('#routine-template').html());
    this.render();
  },

  render: function() {
    cl(this.model)
    this.$el.html(this.routineTemplate(this.model.toJSON()));
    this.$('button').hide();
  },

  

  events: {
    'click' : 'showButtons'
  }

});