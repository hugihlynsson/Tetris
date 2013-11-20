// ===========
// SCORE CLASS
// ===========

"use strict";

var SoundManager = function () {
    // Private variables and methods:
    var _sounds = {};

    // Public methods:
    return {
        add: function (name, file) {
            _sounds[name] = new Audio(file);
            console.log('Added: ' + _sounds[name]);
        },

        play: function (name, doLoop) {
            if ()
            var sound = _sounds[name];
            sound.loop = doLoop;
            sound.play();
        },
        pause: function (name) {
            _sounds[name].pause();
        }
        stop: function (name) {
            _sounds[name].pause();
            _sounds[name].currentTime = 0;
        },

    };
};
