App.Views.PlayRoutine = Backbone.View.extend({
  el: '#playback',
  initialize: function() {
    this.listenTo(this.collection, 'reset', this.start);
  },

  setStretches: function(stretches) {
    this.collection.reset(stretches);
  },

  start: function(stretchNum) {

    $('#left-container').empty();
    $('#right-container').empty();
    
    var renderTime = function(time) {
      $('#playback').text(time);
    };

    var tenSeconds = function(time) {
      if (time === 5) {
        utter(time + ' seconds remaining');
      }
    };

    var checkZero = function(time) {
      if (time === 0) {
        utter('stretch completed.');
        clearInterval(stretchTimer);
        stretchNum++;
        if (stretchNum < stretches.length) {
          current = stretches.at(stretchNum).toJSON();
          // announce next stretch
          beginStretchTimer(current);         
        } else {
          utter('Congratulations! You have finished your routine!');
          App.userView.checkSession();
          this.collection.reset({reset: false})
        }
      }
    };

    var beginStretchTimer = function(current) {  
    // Set current stretch & rep time
      var repTime = current.rep_time;
      var repNum = current.rep_num;
      var time = repTime * repNum;
      var name = current.name;
      // start stretch timer
      utter('Begin ' + name);
      stretchTimer = setInterval(function() {
        time--;
        renderTime(time);
        if (repTime >= 30) { tenSeconds(time) };
        
        checkZero(time);
      }, 1000);
      
    };
    

    var stretches = this.collection;
    var stretchNum = 0;
    var current = stretches.at(stretchNum).toJSON();
    beginStretchTimer(current);
    // function loop() {
    //   cl(i);
    //   cl(stretches);
    //   var current = stretches.at(i).toJSON();
    //   var name    = current.name;
    //   // var repTime = current.rep_time;
    //   var repTime = 10;
    //   var setup   = current.setup;
    //   if (i !== 0) utter('stretch completed. Good job.');

    //   utter('The next stretch is ' + name);
    //   utter('It will last ' + repTime + ' seconds');
    //   utter('Begin.');
    //   i++;
    //   if (i < limit) {
    //     setTimeout(loop, repTime * 1000);
    //   }
    //   // setTimeout(function(){
    //   //   utter('Stretch completed. Good job!');
    //   // }, repTime);
    // }

    // loop();
    // utter('stretch completed. Good job.')

  },

  events: {}

});