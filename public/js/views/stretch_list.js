App.Views.StretchList = Backbone.View.extend({

  el: '#right-container',

  initialize: function(routineModel) {
    cl('created: stretch list view');
    var stretchArray = routineModel.attributes.stretches;
    this.collection = new App.Collections.Stretch(stretchArray);
    // this.collection.fetch({ reset: true });
    this.listenTo( this.collection, 'add', this.renderStretchList);
    this.renderStretchList();
  },

  renderStretchList: function() {
    this.collection.each( this.renderStretch, this );
  },

  renderStretch: function(stretch) {
    this.$el.append(new App.Views.StretchPreview({ model: stretch }).$el);
  },

  events: {}

});