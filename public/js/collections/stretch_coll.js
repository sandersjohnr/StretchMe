App.Collections.Stretch = Backbone.Collection.extend({

  url: '/stretches',

  initialize: function() {
    cl('created: stretch collection');
  }
  
});