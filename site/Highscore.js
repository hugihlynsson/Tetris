// ===============
// HIGHSCORE CLASS
// ===============

'use strict';

var Highscore = function (){
    // Private variables and methods:

    // Get scores from Localstorage if exist:
    var _scores = [];
    for (var i = 0; i < 5; i++) {
		_scores[i] = window.localStorage.getItem('highscore' + i) || 0;
    }

    console.log(_scores);

    // window.localStorage.getItem();
    // window.localStorage.setItem();

    // Public methods:
    return {
		addScore : function (newScore) {
			var isHighscore = false;

			for (var i = 4; i >= 0; i--) {
				if (newScore > _score[i]) {
					isHighscore = true;
				}
			}

			return isHighscore;
		},
		render   : function (ctx, cx, y) {
			var boxWidth = 200;
			ctx.fillStyle = 'white';
	        ctx.font = '100 20px Helvetica';
	        ctx.textAlign = 'center';
			ctx.fillText('Highscores:', cx, y);
			if (_scores)
	        for (var i = 0; i < 5; i++) {
				ctx.fillText(_scores[i], cx, y += 30);
	        	if (_scores[i] == 0) break; // Should be == to compare to falsy
	        }
		}
    };
};
