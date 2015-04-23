App.Views.RoutineList = Backbone.View.extend({
  el: '#left-container',

  initialize: function() {
    this.newRoutineTemplate = Handlebars.compile($('#routine-new-template').html());
    this.listenTo(this.collection, 'reset', this.render);
    this.listenTo(this.collection, 'destroy', this.render);
  },

  fetchAndShowRoutines: function() {
    this.collection.fetch({ reset: true });
  },

  render: function() {
    this.$el.empty();
    this.collection.each( this.renderRoutine, this );
  },

  renderRoutine: function(routine) {
    this.$el.append(new App.Views.Routine({ 
      model: routine,
      collection: routine.attributes.stretches
    }).$el);
  },

  newRoutine: function() {
    $('#main').children().empty();
    this.$el.html( this.newRoutineTemplate() );
  },

  createRoutine: function() {
    var routineName = $('#routine-name').val();
    var routineDesc = $('#routine-description').val();
    var routineData = {
      name: routineName,
      description: routineDesc
    };
    if ( routineName === '' ) {
      $('.error').remove();
      this.$el.append($('<li class="error">You must enter a name for your routine</li>'));
    } else {
      var routineModel = new App.Models.Routine(routineData);
      routineModel.save();
      App.userView.checkSession();
    }
  },

  events: {
    'click #create-routine'    : 'createRoutine'
  }

});