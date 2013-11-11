// ===============
// HIGHSCORE CLASS
// ===============

// A field 'class'
var Highscore = function (x, y, color, fontSize, font) 
{
	// Private variables and methods:
	var _x = x;
	var _y = y;
	var _color = color;
	var _fontSize = fontSize;
	var _font = font;
	var _score = 0;

	// Public methods:
	return {
		render : function (ctx) {
			var oldStyle = ctx.fillStyle;
			ctx.fillStyle = _color;
			ctx.font = _fontSize + ' ' + _font;
			ctx.fillText('Score: ' + _score, _x, _y+_fontSize);
			ctx.fillStyle = oldStyle;
		},
		addScore : function (amount) { _score += amount; }
	};
};