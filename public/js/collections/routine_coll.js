App.Collections.Routine = Backbone.Collection.extend({

  model: App.Models.Routine,

  url: '/routines',

  initialize: function() {
    cl('created: routine collection');
  }

});