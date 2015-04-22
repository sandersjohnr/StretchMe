'use strict';

// Create the wrapper with "voicerss" provider with full options
var Speak = require('tts-speak');
var speak = new Speak({
    tts: {  
        engine: {                       // The engine to use for tts
            name: 'voicerss',           
            key: '42f4a89c75f6419f84aeafe98a84c301',     // The API key to use
        },
        lang: 'en-us',                  // The voice to use
        speed: 60,                      // Speed in %
        format: 'mp3',                  // Output audio format
        quality: '44khz_16bit_stereo',  // Output quality
        cache: __dirname + '/cache',    // The cache directory were audio files will be stored
        loglevel: 0,                    // TTS log level (0: trace -> 5: fatal)
        delayAfter: 0                   // Mark a delay (ms) after each message
    },
    speak: {
        engine: 'auto',                 // Auto select the audio player
        volume: 100,                    // Volume in %
        loglevel: 0                     // Audio player log level
    },
    loglevel: 0                         // Wrapper log level
});

// speak.once('ready', function() {
//     this.say('Hello world');

//     this.once('idle', function() {
//         speak.say('woot woot woot');
//     });
// });

modules.exports = speak;