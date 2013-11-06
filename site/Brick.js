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
	var _keyUp = (keyControl) ? keyControl[2] : 0;
	var _keyDown = (keyControl) ? keyControl[3] : 0;

	var _spatialId = spatialManager.getNewSpatialID();
	var _isStuck = false;
	// In ms. If > 0, brick should not move.
	var _moveTimer = 0;
	var _secBetweenMoves = 0.2;
	var _rotateTimer = 0;
	var _secBetweenRotates = 0.05;
	var _color = "red";

	var _unitArray = [];

	// TODO: Define all types to emulate old tetris:
	// Types: 
	// I: four straight ☐☐☐☐
	// L: three and one, L shaped
	// S: two and two
	// A: arrow-button-shaped, three and one on top.
	// B: big block.
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
		var _brickTypes = ['I', 'L', 'S', 'A', 'B'];
		_type = _brickTypes[Math.floor(Math.random()*_brickTypes.length)];
		_unitArray = [1];
	}

	if (_type === 'I') {
		_units.push(new Brickunit(_x-_size, _y, _size));
		_units.push(new Brickunit(_x+_size, _y, _size));
		_units.push(new Brickunit(_x+_size*2, _y, _size));
		_color = "blue";
		_unitArray = [1, 1, 1, 1];
	}
	else if (_type === 'L') {
		_units.push(new Brickunit(_x, _y-_size, _size));
		_units.push(new Brickunit(_x, _y+_size, _size));
		_units.push(new Brickunit(_x+_size, _y+_size, _size));
		_color = "green";
		_unitArray = [[1, 0], [1, 0], [1, 1]];
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
	else if (_type === 'B') {
		_units.push(new Brickunit(_x, _y-_size, _size));
		_units.push(new Brickunit(_x+_size, _y-_size, _size));
		_units.push(new Brickunit(_x+_size, _y, _size));
		_color = "purple";
	}

	var _canMove = function (x) {
		for (var i in _units) {
			var unitPos = _units[i].getPos();
			unitPos.cx += x;
			if (spatialManager.getField(unitPos)) return false; 
		}
		return true;
	}

	var _rotate = function () {
		// Create rotated brick (units)
		console.log('rotating');
		var rotPos = _units[0].getPos();
		var oldUnits = _units;
		for (var i = 1; i < _units.length; i++) {
			pos = _units[i].getPos();
			var xDiff = rotPos.cx - pos.cx;
			var yDiff = rotPos.cy - pos.cy;
			_units[i].setPos(rotPos.cx + yDiff, rotPos.cy + xDiff);
			// Check if new units are colliding, if so - revert to oldUnits.
		}

		// If they do not collide with other stuff, make it this one.
	}

	var _checkMovement = function (du) {
		if (keys[_keyUp] && _rotateTimer < 0) {
			// TODO: Check if can rotate, then do:
			_rotateTimer = _secBetweenMoves*SECS_TO_NOMINALS*du;
			_rotate();
		}
		if (keys[_keyDown]) {
			// TODO: Check if can rotate, then do:
		}
		if (keys[_keyRight] && _moveTimer < 0) {
			if (!_canMove(_size)) return;
			for (var i in _units) { _units[i].nudge(+_size); }
			_moveTimer = _secBetweenMoves*SECS_TO_NOMINALS*du;
		}
		if (keys[_keyLeft] && _moveTimer < 0) {
			// First check if move is allowed:
			if (!_canMove(-_size)) return;
			for (var i in _units) { _units[i].nudge(-_size); }
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
				_rotateTimer -= 1;
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
			for (var i in _units) { 
				_units[i].align();
				spatialManager.markField(_units[i].getPos());
			}
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
