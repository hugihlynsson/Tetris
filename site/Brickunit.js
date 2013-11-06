// =========
// BRICKUNIT
// =========

// Creating a "class" Brickunit
var Brickunit = function (x, y, size) {

	// "Private" variables and functions are kept here:
	var _cx = x;
	var _cy = y;
	var _size = size;

	// "Public" functions are part of the returned object (note change of syntax):
	return {
		update : function (y) { _cy += y; },
		render : function (ctx, color) {
			var oldStyle = ctx.fillStyle;
			util.fillBox(ctx, _cx, _cy, _size, _size, color);
			ctx.fillStyle = oldStyle;
		},
		getPos  : function () { return { cx : _cx, cy : _cy }; },
		setPos  : function (x, y) { _cx = x; _cy = y },
		getSize : function () { return _size; },
		nudge   : function (x) { _cx += x; },
		align  	: function () { 
			_cy = spatialManager.getClosestY(_cy);
			_cx = spatialManager.getClosestY(_cx); 
		},
		collidesWith : function (brickunit) {
			// A simple collition system that uses the units radius
			// but works because we only need to compere the centers
			// of the squares sides:
			var otherPos = brickunit.getPos();
			if (util.distSq(_cx, _cy, otherPos.cx, otherPos.cy) < _size*brickunit.getSize()*0.9) {
				return true;
			}
			return false;
		},
	};
};