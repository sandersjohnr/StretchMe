App.Views.User = Backbone.View.extend({
  
  el: '#session',

  initialize: function() {
    cl('created: user view');
    this.userTemplate = Handlebars.compile($('#user-template').html());
    this.signupTemplate = Handlebars.compile($('#signup-template').html());
    this.loginTemplate = Handlebars.compile($('#login-template').html());
    this.newRoutineTemplate = Handlebars.compile($('#routine-new-template').html());
    $('#stretch-modal').hide();
    $('#stretch-modal').empty();
    this.renderSession();
  },

  renderSession: function() {
    $.get('/current_user').done( function (user) {
      if (user) {
        this.$el.html( this.userTemplate(user) );
        $('#left-container').html(new App.Views.RoutineList(user));
      } else {
        this.$el.html( this.loginTemplate() );
      }
    }.bind(this));
  },

  renderSignup: function () {
    this.$el.empty();
    this.$el.html( this.signupTemplate() );
  },

  signup: function() {
    var username = $('#signup-username').val(),
        password = $('#signup-password').val(),
        firstName = $('#signup-firstname').val(),
        lastName = $('#signup-lastname').val();
    if ( username === '' || password === '' ) {
      $('.error').remove();
      this.$el.append($('<li class="error">You must enter both a username and a password</li>'));
    } else {
      $.post('/users', {
        username: username,
        password: password,
        first_name: firstName,
        last_name: lastName
      }).done( this.renderSession.bind(this) )
        .fail( this.errorHandling.bind(this) );
    }
  },

  login: function() {
    var username = $('#login-username').val();
    var password = $('#login-password').val();
    $.post('/sessions', {
      username: username,
      password: password
    }).done( function () {
        $.get('/current_user').done(function (user) {
          this.$el.html( this.userTemplate(user) );
          $('#left-container').html(new App.Views.RoutineList(user));
        }.bind(this));
      }.bind(this))
      .fail( this.errorHandling.bind(this) );
  },

  keypressLogin: function(e) {
    if (e.which == 13) this.login();
  },

  logout: function() {
    $('#main').children().empty();

    $.ajax({
      url: '/sessions',
      method: 'DELETE'
    }).done( this.renderSession.bind(this) );
  },

  errorHandling: function (response) {
    $('.error').remove();
    var err = response.responseJSON;
    this.$el.append($('<li class="error">' + err.msg + '</li>'))
  },

  newRoutine: function() {
    $('#left-container').empty();
    $('#right-container').empty();
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
      $.post('/routines', {
        name: routineName,
        description: routineDesc
      }).done( this.renderSession.bind(this) )
        .fail( this.errorHandling.bind(this) );
    }
  },

  events: {
    'click #signup-link'              : 'renderSignup',
    'click #button-signup'            : 'signup',
    'click #button-logout'            : 'logout',
    'click #button-login'             : 'login',
    'click #button-new-routine'       : 'newRoutine',
    'click #button-create-routine'    : 'createRoutine',
    'click #login-link, #button-show-all-routines' : 'renderSession',
    'keypress #login-username, #login-password'    : 'keypressLogin'
  }

});