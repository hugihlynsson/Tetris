// =========
// BRICKUNIT
// =========

// Creating a "class" Brickunit
var Brickunit = function (x, y, size) {

	// "Private" variables and functions are kept here:
	var _x = x;
	var _y = y;
	var _size = size;

	// "Public" functions are part of the returned object (note change of syntax):
	return {
		update : function (y) { _y += y; },
		render : function (ctx) {
			util.fillBox(ctx, _x, _y, _size, _size, "red");
		},
		getPos : function () { return { cx : _x, cy : _y }; },
		getSize : function () { return _size; },
		nudge : function (x) { _x += x; },
		collidesWith : function (brickunit) {
			// A simple collition system that uses the units radius
			// but works because we only need to compere the centers
			// of the squares sides:
			var otherPos = brickunit.getPos();
			if (util.distSq(_x, _y, otherPos.cx, otherPos.cy) < _size*brickunit.getSize()) {
				return true;
			}
			return false;
		}
	};
};