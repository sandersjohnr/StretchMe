App.Views.StretchList = Backbone.View.extend({

  el: '#right-container',

  initialize: function(routineModel) {
    cl('created: stretch list view');
    // this.listenTo( this.collection, 'change', this.renderStretchPreview);
    this.listenTo( this.collection, 'reset', this.renderStretchList);
  },

  renderStretchList: function() {
    this.$el.empty();
    this.collection.each( this.renderStretchPreview, this );
  },

  renderStretchPreview: function(stretch) {
    this.$el.append(new App.Views.StretchPreview({ model: stretch }).$el);
  },

  renderAllStretches: function(routineModel) {
    this.collection.fetch({ reset: true });
  }



});