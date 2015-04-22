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
  },

  events: {
    'click' : 'showModal'
  }

});
