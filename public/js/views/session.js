App.Views.User = Backbone.View.extend({
  
  el: '#session',

  initialize: function() {
    cl('created: user view');
    $('#stretch-modal').hide();
    $('#stretch-modal').empty();
    this.userTemplate = Handlebars.compile($('#user-template').html());
    this.signupTemplate = Handlebars.compile($('#signup-template').html());
    this.loginTemplate = Handlebars.compile($('#login-template').html());
    this.checkSession();
  },

  checkSession: function() {
    $.get('/current_user').done( function (user) {
      if (user) {
        $('#left-container').empty();
        $('#right-container').empty();
        $('#playback').empty();
        this.renderSession(user);
        App.routineList.fetchAndShowRoutines(user);

      } else {
        this.$el.html( this.loginTemplate() );
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
    $.ajax({
      url: '/sessions',
      method: 'DELETE'
    }).done( this.checkSession.bind(this) );
  },

  errorHandling: function (response) {
    $('.error').remove();
    var err = response.responseJSON;
    this.$el.append($('<li class="error">' + err.msg + '</li>'))
  },

  events: {
    'click #signup-link'  : 'renderSignup',
    'click #login-link'   : 'renderSession',
    'click #signup'       : 'signup',
    'click #logout'       : 'logout',
    'click #login'        : 'login',
    'click #show-all-routines' : 'checkSession',
    'keypress #login-username, #login-password' : 'keypressLogin'
  }

});