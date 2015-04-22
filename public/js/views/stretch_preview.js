App.Views.StretchPreview = Backbone.View.extend({
  
  initialize: function() {
    cl('created: stretch preview view');
    this.previewTemplate = Handlebars.compile($('#stretch-preview-template').html());
    this.renderPreview();
  },

  renderPreview: function() {
    this.$el.html(this.previewTemplate(this.model.toJSON()));
  },

  showModal: function() {
    App.stretchModal.setStretch(this.model);
    App.stretchModal.showModal();
    // new App.Views.StretchFull({model: this.model});
  },

  events: {
    'click' : 'showModal'
  }

});

  // renderStretchFull: function(clicked) {
  //   var stretchID = $(clicked.target).closest('div').data('id');
  //   var currentStretch = this.collection.findWhere({ id: stretchID });
  //   new App.Views.StretchFull({ model: currentStretch });
  // },