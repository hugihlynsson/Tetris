// =====
// BRICK
// =====

// Creating a "class" Brick
var Brick = function (x, y, size, type, keyControl) {

	// Calling the "constructor" of the "parent" element:
	// Maybe just not use this?
	// this.setup(descr);

	// "Private" variables and functions are kept here:
	var _x = x;
	var _y = y;

	var _speed = 1;
	var _size = size;

	var _keyLeft = (keyControl) ? keyControl[0] : 0;
	var _keyRight = (keyControl) ? keyControl[1] : 0;
	var _keyTop = (keyControl) ? keyControl[2] : 0;
	var _keyDown = (keyControl) ? keyControl[3] : 0;

	var _spatialId = spatialManager.getNewSpatialID();
	var _isStuck = false;
	// In ms. If > 0, brick should not move.
	var _moveTimer = 0;
	var _secBetweenMoves = 0.2;
	var _color = "red";

	// TODO: Define all types to emulate old tetris:
	// Types: 
	// I: four straight ☐☐☐☐
	// L: three and one, L shaped
	// S: two and two
	// A: arrow-button-shaped, three and one on top.
	var _type = type;

	// There is always one:
	var _units = [new Brickunit(_x, _y, _size)];

	// If it's a number, it's a board bottom:
	if (!isNaN(_type)) {
		for (var i = 1; i < _type; i++) {
			_units.push(new Brickunit(_x+_size*i, _y, _size));
		}
	}
	else {
		var _brickTypes = ['I', 'L', 'S', 'A'];
		_type = _brickTypes[Math.floor(Math.random()*_brickTypes.length)];
	}

	if (_type === 'I') {
		_units.push(new Brickunit(_x-_size, _y, _size));
		_units.push(new Brickunit(_x+_size, _y, _size));
		_units.push(new Brickunit(_x+_size*2, _y, _size));
		_color = "blue";
	}
	else if (_type === 'L') {
		_units.push(new Brickunit(_x, _y-_size, _size));
		_units.push(new Brickunit(_x, _y+_size, _size));
		_units.push(new Brickunit(_x+_size, _y+_size, _size));
		_color = "green";
	}
	else if (_type === 'S') {
		_units.push(new Brickunit(_x-_size, _y, _size));
		_units.push(new Brickunit(_x, _y+_size, _size));
		_units.push(new Brickunit(_x+_size, _y+_size, _size));
		_color = "yellow";
	}
	else if (_type === 'A') {
		_units.push(new Brickunit(_x, _y-_size, _size));
		_units.push(new Brickunit(_x-_size, _y, _size));
		_units.push(new Brickunit(_x+_size, _y, _size));
	}

	var _checkMovement = function (du) {
		if (keys[_keyLeft] && _moveTimer < 0) { 
			for (var i in _units) { _units[i].nudge(-_size*du); }
			_moveTimer = _secBetweenMoves*SECS_TO_NOMINALS*du;
		}
		if (keys[_keyRight] && _moveTimer < 0) {
			for (var i in _units) { _units[i].nudge(+_size*du); }
			_moveTimer = _secBetweenMoves*SECS_TO_NOMINALS*du;
		}
	};

	// "Public" functions are part of the returned object (note change of syntax):
	return {
		update : function (du) {
			if (!_isStuck) {
				_x += _speed*du;
				for (var i in _units) { _units[i].update(_speed*du); }
				_moveTimer -= 1;
				_checkMovement(du);
			}
		},
		render : function (ctx) {
			for (var i in _units) { _units[i].render(ctx, _color); }
		},
		getPos : function () {
			return { cx : _x ,cy: _y };
		},
		getHeight : function () {
			return _size;
		},
		getUnits : function () {
			return _units;
		},
		stick : function () {
			_isStuck = true;
			for (var i in _units) { _units[i].align(); }
		},
		nudge : function (x) { 
			_x += x;
			for (var i in _units) { _units[i].nudge(x); } 
		},
		collidesWith : function (brick) {
			// TODO: implement more efficient collition:
			// (maybe it should be more generic and done in spatial manager?)
			for (var i in _units) {
				var otherUnits = brick.getUnits();
				for (var j in otherUnits) {
					if (_units[i].collidesWith(otherUnits[j])) return true;
				}
			}
			return false;
		},
	};
};
