// ===========
// SCORE CLASS
// ===========

var SoundManager = function () {

    // Private variables and methods:

    // _sounds is a dictionary and contains name of the sounds as keys and
    // the file locations as values:
    var _sounds = {};

    // Public methods:
    return {
        add: function (name, file) {
            _sounds[name] = new Audio(file);
            console.log('Added: ' + _sounds[name]);
        },

        play: function (name, doLoop) {

            var sound = _sounds[name];
            if (!sound)
            {
                console.log('Soundmanager: Tried to play sound ' + name + ' that does not exist!')
                return;
            }
            sound.loop = doLoop;
            sound.play();
        },

        pause: function (name) {
            var sound = _sounds[name];
            if (!sound)
            {
                console.log('Soundmanager: Tried to pause sound ' + name + ' that does not exist!')
                return;
            }
            sound.pause();
        },

        stop: function (name) {
            var sound = _sounds[name];
            if (!sound)
            {
                console.log('Soundmanager: Tried to stop sound ' + name + ' that does not exist!')
                return;
            }
            sound.pause();
            sound.currentTime = 0;
        },

    };
};
