App.Views.User = Backbone.View.extend({
  el: '#session',

  initialize: function() {
    $('#stretch-modal').hide();
    $('#stretch-modal').empty();
    this.userTemplate = Handlebars.compile($('#user-template').html());
    this.signupTemplate = Handlebars.compile($('#signup-template').html());
    this.loginTemplate = Handlebars.compile($('#login-template').html());
    this.checkSession();
  },

  checkSession: function() {
    $('#playback').hide();
    $('#left-container').empty();
    $('#right-container').empty();
    $('#all-stretches').empty();

    $.get('/current_user').done(function(user) {
      if (user) {
        this.renderSession(user);
        App.stretchModal.hideModal();
        App.routineList.fetchAndShowRoutines();
      } else {
        this.$el.html(this.loginTemplate());
      }
    }.bind(this));
  },

  renderSession: function(user) {
    this.$el.html( this.userTemplate(user) );
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
          App.routineList.fetchAndShowRoutines(user);
        }.bind(this));
      }.bind(this))
      .fail( this.errorHandling.bind(this) );
  },

  keypressLogin: function(e) {
    if (e.which == 13) this.login();
  },

  logout: function() {
    $('#left-container').empty();
    $('#right-container').empty();
    $('#all-stretches').empty();
    $.ajax({
      url: '/sessions',
      method: 'DELETE'
    }).done( this.checkSession.bind(this) );
  },

  errorHandling: function (response) {
    $('.error').remove();
    var err = response.responseJSON;
    this.$el.append($('<li class="error">' + err.msg + '</li>'));
  },

  showAllStretches: function() {
    App.allStretches.renderAllStretches();
  },

  newRoutine: function() {
    App.routineList.newRoutine();
  },

  events: {
    'click #signup-link'        : 'renderSignup',
    'click #login-link'         : 'checkSession',
    'click #signup'             : 'signup',
    'click #logout'             : 'logout',
    'click #login'              : 'login',
    'click #show-all-routines'  : 'checkSession',
    'click #show-all-stretches' : 'showAllStretches',
    'click #new-routine'        : 'newRoutine',
    'keypress #login-username, #login-password' : 'keypressLogin'
  }

});