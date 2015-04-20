App.Views.User = Backbone.View.extend({
  
  el: '#main',

  initialize: function() {
    cl('created: user view');
    this.userTemplate = Handlebars.compile($('#user-template').html());
    this.signupTemplate = Handlebars.compile($('#signup-template').html());
    this.loginTemplate = Handlebars.compile($('#login-template').html());
    this.renderSession();
    // this.renderLogin();
  },

  renderSession: function() {
    $.get('/current_user').done( function (user) {
      if (user) {
        this.$el.html( this.userTemplate(user) );
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
    $.post('/users', {
      username: username,
      password: password,
      first_name: firstName,
      last_name: lastName
    }).done( this.renderSession.bind(this) );
  },

  login: function() {
    var username = $('#login-username').val();
    var password = $('#login-password').val();
    $.post('/sessions', {
      username: username,
      password: password
    }).done( this.renderSession.bind(this) );
  },

  logout: function() {
    $.ajax({
      url: '/sessions',
      method: 'DELETE'
    }).done( this.renderSession.bind(this) );
  },

  events: {
    'click #login-link'     : 'renderSession',
    'click #signup-link'    : 'renderSignup',
    'click #button-signup'  : 'signup',
    'click #button-logout'  : 'logout',
    'click #button-login'   : 'login'
  }


});