// ===============
// SoundManager CLASS
// ===============
"use strict";
// A field 'class'
var SoundManager = function (){
    // Private variables and methods:
    //var _sounds = {};
    var mainSound = new Audio('sounds/tetris_song_halldor.m4a')
    // Public methods:
    return {
        addSound : function (name, file){
            _sounds[name] = new Audio(file) ;
            
            console.log('Added: ' + _sounds[name]);
        },

        playSound : function (){
           this.mainSound.play();
        },
        stopSound : function (name) {
                    },
       
    };
};
