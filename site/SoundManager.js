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
            _sounds[name].load();
        },

        play: function (name, doLoop, volume) {

            var sound = _sounds[name];
            if (!sound) return;

            sound.loop = doLoop;
            sound.volume = volume || 1;

            // If not loaded, they play when ready:
            if (sound.readyState < 3) 
            {
                sound.addEventListener('canplaythrough', function() { sound.play(); }, false);
            }
            else
            {
                sound.play();
            }
        },

        pause: function (name) {
            if (_sounds[name]) _sounds[name].pause();
        },

        stop: function (name) {
            var sound = _sounds[name];
            if (!sound) return;
            sound.pause();
            sound.currentTime = 0;
        },

    };
};
