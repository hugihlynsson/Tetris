// ===============
// HIGHSCORE CLASS
// ===============

// A field 'class'
var Highscore = function (x, y, color, style)
{
	// Private variables and methods:
	var _x = x;
	var _y = y;
	var _color = color;
	var _style = style;
	var _score = 0;

	// Public methods:
	return {
		render : function (ctx) {
			var oldStyle = ctx.fillStyle;
			ctx.fillStyle = _color;
			ctx.font = style;
			// TODO: fix offset hack:
			ctx.fillText(_score, _x+4, _y+18);
			ctx.fillStyle = oldStyle;
		},
		addScore : function (amount) { _score += amount; }
	};
};