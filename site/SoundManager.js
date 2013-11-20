// ===============
// SoundManager CLASS
// ===============
"use strict";
// A field 'class'
var SoundManager = function (){
    // Private variables and methods:
    //var _sounds = {};
    var _sounds = new Audio('sounds/tetris_song_halldor.m4a')
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
