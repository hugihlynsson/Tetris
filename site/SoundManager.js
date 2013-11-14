// ===============
// SoundManager CLASS
// ===============
"use strict";
// A field 'class'
var SoundManager = function (){
    // Private variables and methods:
    var _sounds = {};

    // Public methods:
    return {
        addSound : function (name, file){
            _sounds[name] = file;
            
            console.log('Added: ' + _sounds[name]);
        },

        playSound : function (name){
            _sounds[name]
        },
        stopSound : function (name){

        },
       
    };
};
