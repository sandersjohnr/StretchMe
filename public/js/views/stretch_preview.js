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

  removeStretch: function() {
    var stretchID = this.$('.stretch-info').data('id');
    var routineID = $('.routine-info').data('id');
    $.post('/routines/'+routineID+'/remove_stretch/'+stretchID).done (function(){
      App.routineList.fetchAndShowRoutines();
      $.get('/routines/' + routineID).done(function(routine) {
        App.stretchList.collection.reset();
      })
    });
  },

  events: {
    'click .stretch-info' : 'showModal',
    'click .remove-stretch' : 'removeStretch'
  }

});
