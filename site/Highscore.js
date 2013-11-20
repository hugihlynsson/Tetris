// ===============
// HIGHSCORE CLASS
// ===============

"use strict";

var Highscore = function (){
    // Private variables and methods:
    var _sounds;
    // Public methods:
    return {
        add: function (name, file){
            _sounds[name] = new Audio(file);
            console.log('Added: ' + _sounds[name]);
        },

        play: function (name, doLoop){
            var sound = _sounds[name];
            sound.loop = doLoop;
            sound.play();
        },
        stop: function (name) {
            _sounds[name].play(false);
        },

    };
};
