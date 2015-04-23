App.Views.StretchAll = Backbone.View.extend({

  el: '#all-stretches',

  initialize: function(routineModel) {
    // this.listenTo( this.collection, 'change', this.renderStretchPreview);
    this.listenTo( this.collection, 'reset', this.renderStretchList);
  },

  renderStretchList: function() {
    this.$el.empty();
    this.collection.each( this.renderStretchPreview, this );
  },

  renderStretchPreview: function(stretch) {
    this.$el.append(new App.Views.StretchToAdd({ model: stretch }).$el);
  },

  renderAllStretches: function(routineModel) {
    this.collection.fetch({ reset: true });
  },

  events: {
    
  }

});