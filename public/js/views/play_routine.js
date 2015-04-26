App.Views.PlayRoutine = Backbone.View.extend({
  el: '#playback',

  initialize: function() {
    this.listenTo(this.collection, 'reset', this.start);
  },

  setStretches: function(stretches) {
    this.collection.reset(stretches);
  },

  start: function(stretchNum) {
  //------------------------------------------
  //      MAIN TIMING LOGIC FOR PLAYBACK
  //------------------------------------------

    $('#left-container').empty();
    $('#right-container').empty();
    var setupTimer, 
        stretchTimer;

    var renderTime = function(time) {
      $('#playback').text(time);
    };

    var announceRemaining = function(time) {
      if (time === 18) {
        utter((time-3) + ' more seconds');
      }
    };

    var checkZero = function(time) {
      if (time === 0) {
        utter('stretch completed.');
        clearInterval(stretchTimer);
        stretchNum++;
        if (stretchNum < stretches.length) {
          currentModel = stretches.at(stretchNum);
          beginSetupTimer(currentModel);
        } else {
          utter('Congratulations! You have finished your routine!');
          App.userView.checkSession();
          this.collection.reset({reset: false})
        }
      }
    };

    var beginSetupTimer = function(currentModel) {
      // SHOW MODAL
      App.stretchModal.setStretch(currentModel);

      var current = currentModel.toJSON();
      var setupTime = current.setup_time;

      utter('The next stretch is ' + current.name);
      if (current.roller) utter('Grab your foam roller');
      if (current.band) utter('Grab your strap');
      utter(current.instruction);
      // Announce reps and rep time
      if (current.both_sides) utter('Perform for both left and right sides');
      if (current.rep_num > 1) {
        utter(current.rep_num + ' reps of ' + current.rep_time + ' seconds each') 
      } else {
        utter('Hold the stretch for ' + current.rep_time);
      }

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
      var timeRemaining = repTime * repNum;
      var name = current.name;
      // start stretch timer
      utter('Begin');

      stretchTimer = setInterval(function() {
        timeRemaining--;
        renderTime(timeRemaining);
        if (repNum > 1) {
          if (timeRemaining % repTime === 0 && timeRemaining !== 0) utter('next');
        }
        if (repNum === 1 && repTime >= 30) announceRemaining(timeRemaining);
        checkZero(timeRemaining);
      }, 250);
      
    };
    

    // INITIALIZE
    var stretches = this.collection;
    var stretchNum = 0;
    
    if (stretches.length > 0) {
      this.$el.show();
      var currentModel = stretches.at(stretchNum);
      beginSetupTimer(currentModel);
     
    } else {
      utter('There are no stretches in the selected routine');
      this.$el.hide();
      App.userView.renderSession();
    }

  },

  events: {}

});