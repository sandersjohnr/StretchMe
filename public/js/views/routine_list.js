App.Views.RoutineList = Backbone.View.extend({

  el: '#left-container',

  initialize: function(user) {
    cl('created: routine collection view');
    this.$el.empty();
    this.routineTemplate = Handlebars.compile($('#routine-list-template').html());
    this.newRoutineTemplate = Handlebars.compile($('#routine-new-template').html());
    this.collection = new App.Collections.Routine;
    this.collection.fetch({reset: true});
    this.listenTo(this.collection, 'reset', this.renderRoutineList);
    this.renderMenu();
    this.renderRoutineList();
  },

  renderMenu: function() {
    this.$el.prepend($('<button id="button-show-all-routines">').text('Show All'));
    this.$el.prepend($('<button id="button-new-routine">').text('New'));
    this.$el.append($('<hr>'));
  },

  renderRoutineList: function() {
    cl('rendering routine list');
    $('#right-container').empty();
    this.collection.each( this.renderRoutine, this );
  },

  renderRoutine: function(routine) {
    this.$el.append(this.routineTemplate(routine.toJSON()));
  },

  setCurrentRoutine: function(clicked) {
    var routineID = $(clicked.target).closest('div').data('id');
    var currentRoutine = this.collection.findWhere({ id: routineID });
    this.$el.empty();
    this.renderMenu();
    this.renderRoutine(currentRoutine);
    $('#right-container').empty();
    new App.Views.StretchList(currentRoutine);
  },

  newRoutine: function() {
    this.$el.empty();
    this.$el.html( this.newRoutineTemplate() );
  },

  createRoutine: function() {
    var routineName = $('#routine-name').val();
    var routineDesc = $('#routine-description').val();
    if ( routineName === '' ) {
      $('.error').remove();
      this.$el.append($('<li class="error">You must enter a name for your routine</li>'));
    } else {
      this.$el.empty();
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
    'click #button-new-routine'       : 'newRoutine',
    'click #button-create-routine'    : 'createRoutine',
    'click #button-show-all-routines' : 'renderRoutineList',
    'click .routine-info'             : 'setCurrentRoutine',
    'click .button-edit-routine'      : 'editRoutine'
  }

});