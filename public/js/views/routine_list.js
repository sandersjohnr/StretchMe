App.Views.RoutineList = Backbone.View.extend({

  el: '#left-container',

  initialize: function(user) {
    cl('created: routine collection view');
    this.routineTemplate = Handlebars.compile($('#routine-list-template').html());
    this.collection = new App.Collections.Routine;
    this.collection.fetch({reset: true});
    this.listenTo(this.collection, 'reset', this.renderRoutineList);
  },

  renderRoutineList: function() {
    cl('rendering routine list');
    // this.$el.append($('<button id="button-new-routine">').text('New'));
    this.collection.each( this.renderRoutine, this );
  },

  renderRoutine: function(routine) {
    this.$el.append(this.routineTemplate(routine.toJSON()));
  },

  setCurrentRoutine: function(clicked) {
    var routineID = $(clicked.target).closest('div').data('id');
    var currentRoutine = this.collection.findWhere({ id: routineID });
    this.$el.empty();
    this.renderRoutine(currentRoutine);
    $('#right-container').empty();
    new App.Views.StretchList(currentRoutine);
  },

  editRoutine: function() {

  },


  events: {
    'click .routine'             : 'setCurrentRoutine',
    'click .button-edit-routine' : 'editRoutine'
  }

});