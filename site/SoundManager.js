// ===========
// SCORE CLASS
// ===========

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

            if (!_sounds[name])
            {
                console.log('Soundmanager: Tried to play sound ' + name + ' that does not exist!')
                return;
            }
            var sound = _sounds[name];
            sound.loop = doLoop;
            sound.play();
        },

        pause: function (name) {

            if (!_sounds[name]) 
            {
                console.log('Soundmanager: Tried to pause sound ' + name + ' that does not exist!')
                return;
            }
            _sounds[name].pause();
        },

        stop: function (name) {

            if (!_sounds[name]) 
            {
                console.log('Soundmanager: Tried to stop sound ' + name + ' that does not exist!')
                return;
            }
            _sounds[name].pause();
            _sounds[name].currentTime = 0;
        },

    };
};
