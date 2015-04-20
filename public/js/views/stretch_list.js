App.Views.StretchList = Backbone.View.extend({

  el: '#right-container',

  initialize: function(routineID) {
    cl('created: stretch collection view');
    this.collection = new App.Collections.Stretch(routineID);
    this.collection.fetch('reset')
  }
});