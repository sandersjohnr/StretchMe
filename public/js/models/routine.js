App.Models.Routine = Backbone.Model.extend({
  initialize: function() {
    cl('created: routine model');
  },
  urlRoot: '/routines'
});