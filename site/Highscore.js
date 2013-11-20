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

    var _saveScores = function () {
    	console.log(_scores);
    	for (var i = 0; i < 5; i++) {
    		window.localStorage.setItem('highscore' + i, _scores[i]);
    	}
    	console.log('Scores saved to localStorage');
    }

    // Public methods:
    return {
		add : function (newScore) {
			var isHighscore = true;
			for (var i = 0; i < 5; i++) {
				if (newScore > _scores[i]) {
					isHighscore = true;
					console.log(i);
					for (var j = 4; j > i; j--) {
						_scores[j] = _scores[j-1];
						console.log('Copying from and to: ' + j-1 + ' ' + j)
					}
					_scores[i] = newScore;
					break;
				}
			}

			if (isHighscore) {
				_saveScores();
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
