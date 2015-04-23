App.Views.StretchToAdd = Backbone.View.extend({
  initialize: function() {
    this.template = Handlebars.compile($('#stretch-to-add-template').html());
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
  },

  addStretchToRoutine: function() {
    var stretchID = this.$('.stretch-info').data('id');
    var routineID = $('.routine-info').data('id');

      cl(routineID, stretchID)
    $.post('/routines/' + routineID + '/add_stretch/' + stretchID).done(function () {
      App.routineList.fetchAndShowRoutines();
    });
  },

  events: {
    'click .add-stretch': 'addStretchToRoutine'
  }

});