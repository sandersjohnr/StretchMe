App.Views.User = Backbone.View.extend({
  
  el: '#session',

  initialize: function() {
    cl('created: user view');
    this.userTemplate = Handlebars.compile($('#user-template').html());
    this.signupTemplate = Handlebars.compile($('#signup-template').html());
    this.loginTemplate = Handlebars.compile($('#login-template').html());
    this.renderSession();
  },

  renderSession: function() {
    $.get('/current_user').done( function (user) {
      if (user) {
        this.$el.html( this.userTemplate(user) );
        $('#main').html(new App.Views.RoutineColl);
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
    var username = $('#signup-username').val();
    var password = $('#signup-password').val();
    var firstName = $('#signup-firstname').val();
    var lastName = $('#signup-lastname').val();
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
    }).done( function (user) {
        this.renderSession();
        $('#main').html(new App.Views.RoutineColl);
      }.bind(this) )
      .fail( this.errorHandling.bind(this) );
  },

  keypressLogin: function(e) {
    if (e.which == 13) this.login();
  },

  logout: function() {
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

  events: {
    'click #login-link'     : 'renderSession',
    'click #signup-link'    : 'renderSignup',
    'click #button-signup'  : 'signup',
    'click #button-logout'  : 'logout',
    'click #button-login'   : 'login',
    'keypress #login-username, #login-password' : 'keypressLogin'
  }

});