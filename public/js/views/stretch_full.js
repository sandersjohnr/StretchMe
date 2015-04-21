App.Views.StretchFull = Backbone.View.extend({

  el: '#stretch-modal',

  initialize: function() {
    cl('created: stretch full view');
    this.stretchFullTemplate = Handlebars.compile($('#stretch-full-template').html());
    this.render();
  },

  render: function() {
    this.$el.html( this.stretchFullTemplate( this.model.toJSON () ) );
    this.$el.show();
  },

  closeModal: function() {
    this.$el.hide();
  },

  events: {
    'click .close-link' : 'closeModal',
    'click *'           : 'closeModal'
  }

});