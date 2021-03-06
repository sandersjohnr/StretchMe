var express     = require('express'),
    bodyParser  = require('body-parser'),
    morgan      = require('morgan'),
    request     = require('request'),
    voiceRouter = express.Router();

var urlRoot = 'http://api.voicerss.org/',
    propertiesObject = {
      key : '42f4a89c75f6419f84aeafe98a84c301',
      hl  : 'en-us',
      f   : '22khz_16bit_stereo'     
    };

voiceRouter.get('/:text', function (req, res) {

  propertiesObject.src = req.params.text;
  
  request({
    uri: urlRoot,
    qs:  propertiesObject,
    method: 'GET'
  }, function (error, response, body) {
    console.log(response)
    res.send(response);
  });

}); 

// Export Router
module.exports = voiceRouter;
