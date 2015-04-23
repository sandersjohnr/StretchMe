App.Views.StretchModal = Backbone.View.extend({
  el: '#stretch-modal',

  initialize: function() {
    this.template = Handlebars.compile($('#stretch-modal-template').html());
    this.listenTo(this.model, 'change', this.render);
  },

  setStretch: function(stretch) {
    this.model.set(stretch.toJSON());
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.showModal();
  },

  showModal: function() {
    this.$el.fadeIn(500);
  },

  hideModal: function() {
    this.$el.fadeOut(200);
    this.$el.empty;
  },

  events: {
    'click .close-link' : 'hideModal',
    'click *'           : 'hideModal'
  }

});