// =====
// BRICK
// =====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// Creating a "class" Brick
var Brick = function (x, y, r, l) {

	// Calling the "constructor" of the "parent" element:
	// Maybe just not use this?
	// this.setup(descr);

	// "Private" variables and functions are kept here:
	var _x = x || 50;
	var _y = y || 50;

	var _keyRight = r;
	var _keyLeft = l;
	var _speed = 1;
	var _height = 20;
	var _fieldWidth = 20;

	// "Public" functions are part of the returned object (note change of syntax):
	return {
		update : function (du) {
			_y += _speed;
			if (keys[_keyLeft]) _x -= _fieldWidth;
			if (keys[_keyRight]) _x += _fieldWidth;
		},
		render : function (ctx) {
			util.fillBox(ctx, _x, _y, _height, _height, "red");
		}
	};
};

// Make Entity a "parent class" of Brick:
// Does it need to be its parent element?
// Maybe Brick is THE Entity?
Brick.prototype = new Entity();


// Dev tests:
// Todo: remove before production:
var b = new Brick(50, 50);