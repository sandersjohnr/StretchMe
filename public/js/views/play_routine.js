App.Views.PlayRoutine = Backbone.View.extend({
  el: '#playback',
  initialize: function() {
    this.listenTo(this.collection, 'reset', this.start);
  },

  setStretches: function(stretches) {
    this.collection.reset(stretches);
    this.$el.show();
  },

  start: function(stretchNum) {

    $('#left-container').empty();
    $('#right-container').empty();
    var setupTimer, 
        stretchTimer;

    var renderTime = function(time) {
      $('#playback').text(time);
    };

    var tenSeconds = function(time) {
      if (time === 15) {
        utter((time-2) + ' more seconds');
      }
    };

    var checkZero = function(time) {
      if (time === 0) {
        utter('stretch completed.');
        clearInterval(stretchTimer);
        stretchNum++;
        if (stretchNum < stretches.length) {
          current = stretches.at(stretchNum).toJSON();
          beginSetupTimer(current);
        } else {
          utter('Congratulations! You have finished your routine!');
          App.userView.checkSession();
          this.collection.reset({reset: false})
        }
      }
    };

    var beginSetupTimer = function(current) {
      var setupTime = current.setup_time;
      utter('The next stretch,' + current.name + ', will begin in '+ (setupTime-5) + 'seconds');
      if (current.roller) utter('Grab your foam roller');
      if (current.band) utter('Grab your strap');
      utter(current.intro);

      setupTimer = setInterval(function() {
        setupTime--;
        if (setupTime === 2) utter('Ready?');
        if (setupTime === 0) {
          clearInterval(setupTimer);
          beginStretchTimer(current);
        };
        renderTime(setupTime);
      }, 1000);
      
    };

    var beginStretchTimer = function(current) {  
    // Set current stretch & rep time
      var repTime = current.rep_time;
      var repNum = current.rep_num;
      var time = repTime * repNum;
      var name = current.name;
      // start stretch timer
      utter('Begin');

      stretchTimer = setInterval(function() {
        time--;
        renderTime(time);
        if (repTime >= 30) { tenSeconds(time) };
        checkZero(time);
      }, 100);
      
    };
    


    var stretches = this.collection;
    var stretchNum = 0;
    var current = stretches.at(stretchNum).toJSON();
    beginSetupTimer(current);

  },

  events: {}

});