// ===============
// HIGHSCORE CLASS
// ===============

var Highscore = function (){

    // Private variables and methods:

    // _scores should always be an array with 5 values with _scores[0] being
    // the highest one, the next one lower or qual and so on:
    var _scores = [];

    // On initialization get scores from Localstorage if exist, else zero out:
    for (var i = 0; i < 5; i++)
    {
		_scores[i] = window.localStorage.getItem('highscore' + i) || 0;
    }

    // Store the score in localStorage:
    var _saveScores = function () {
        for (var i = 0; i < 5; i++)
        {
            window.localStorage.setItem('highscore' + i, _scores[i]);
        }
    };

    // Public methods:
    return {
		add: function (newScore) {

			var isHighscore = true;

			for (var i = 0; i < 5; i++)
			{
				if (newScore > _scores[i])
				{
					isHighscore = true;
					console.log(i);
                    for (var j = 4; j > i; j--)
                    {
						_scores[j] = _scores[j-1];
					}
					_scores[i] = newScore;
					break;
				}
			}

			if (isHighscore) _saveScores();

			return isHighscore;
		},

		render: function (ctx, cx, y) {

			ctx.fillStyle = 'white';
	        ctx.font = '100 20px Helvetica';
	        ctx.textAlign = 'center';
			ctx.fillText('Highscores:', cx, y);
	        for (var i = 0; i < 5; i++)
	        {
				ctx.fillText(_scores[i], cx, y += 28);
                if (_scores[i] == 0) break; // Should be == to compare to falsy
	        }
		},

        reset: function () {
            for (var i in _scores) _scores[i] = 0;
            _saveScores();
        }
    };
};
