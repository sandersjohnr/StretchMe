App.Views.StretchList = Backbone.View.extend({

  el: '#right-container',

  initialize: function(routineModel) {
    this.listenTo( this.collection, 'reset', this.renderStretchList);
    this.listenTo( this.collection, 'change' , this.renderStretchList);
  },

  renderStretchList: function() {
    this.$el.empty();
    this.collection.each( this.renderStretchPreview, this );
  },

  renderStretchPreview: function(stretch) {
    this.$el.append(new App.Views.StretchPreview({ model: stretch }).$el);
  }


});