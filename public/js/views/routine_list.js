App.Views.RoutineList = Backbone.View.extend({

  el: '#left-container',

  initialize: function() {
    cl('created: routine collection view');
    // debugger;
    this.routineTemplate = Handlebars.compile($('#routine-new-template').html());
    this.listenTo(this.collection, 'reset', this.renderRoutineList);
  },

  fetchAndShowRoutines: function() {
    this.collection.fetch({ reset: true });
    App.stretchList.collection.reset();
  },

  renderRoutineList: function() {
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
    this.$el.html( this.newRoutineTemplate() );
  },

  createRoutine: function() {
    var routineName = $('#routine-name').val();
    var routineDesc = $('#routine-description').val();
    if ( routineName === '' ) {
      $('.error').remove();
      this.$el.append($('<li class="error">You must enter a name for your routine</li>'));
    } else {
      this.collection.add({
        name: routineName,
        description: routineDesc
      });
    }
  },

  editRoutine: function() {
    // not MVP at the moment
  },

  events: {
    // 'click #button-new-routine'       : 'newRoutine',
    // 'click #button-create-routine'    : 'createRoutine',
    // 'click #button-show-all-routines' : 'renderRoutineList',
    // 'click .routine-info'             : 'setCurrentRoutine',
    // 'click .button-edit-routine'      : 'editRoutine'
  }

});