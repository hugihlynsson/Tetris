// =====
// BRICK
// =====

// Creating a "class" Board
var Board = function (cx, cy, w, h, rows, columns, keyLeft, keyRight, keyUp, keyDown) {

	// "Private" variables and functions are kept here:
	var _cx = cx;
	var _cy = cy;
	var _width = w;
	var _height = h;
	var _rows = rows;
	var _columns = columns;

	var _keyLeft = keyLeft;
	var _keyRight = keyRight;
	var _keyUp = keyUp;
	var _keyDown = keyDown;

	var _brickUnit = _width / _columns;

	var _newBrick = function () {
		return (new Brick(
			_cx, _cy-_height/2, 
			_brickUnit, 'X',
			'D'.charCodeAt(0), 'A'.charCodeAt(0)
		));
	};

	var _currentBrick = _newBrick();
	var _bottomBrick = new Brick(
		_cx-_brickUnit*_columns/2, _cy + _height/2,
		_brickUnit, _columns
	);
	var _stuckBricks = [];

	var _moveTimer = 0;
	var _secBetweenMoves = 0.2;

	var _checkBrickCollition = function (du) {
		var brickPos = _currentBrick.getPos();
		if (_currentBrick.collidesWith(_bottomBrick)) {
			_stickBrick();
			return;
		}
		for (var i in _stuckBricks) {
			if (_currentBrick.collidesWith(_stuckBricks[i])) {
				_stickBrick();
			}
		}
	};

	// Move the fields bricks x to the right or left:
	_nudgeBricks = function (x) {
		_currentBrick.nudge(x);
		_bottomBrick.nudge(x);
		for (i in _stuckBricks) { _stuckBricks[i].nudge(x); }
	};

	// Brick is down, so make a new one:
	_stickBrick = function() {
		_stuckBricks[_stuckBricks.length] = _currentBrick;
		_currentBrick
		_currentBrick = _newBrick();
	}

	// "Public" functions are part of the returned object (note change of syntax):
	return {
		update : function (du) {
			_moveTimer -= 1;

			// Check for movement:
			if (keys[_keyLeft] && _moveTimer < 0) { 
				_cx -= _brickUnit;
				_nudgeBricks(-_brickUnit);
				_moveTimer = _secBetweenMoves*SECS_TO_NOMINALS*du;
			}
			if (keys[_keyRight] && _moveTimer < 0) {
				_cx += _brickUnit;
				_nudgeBricks(_brickUnit);
				_moveTimer = _secBetweenMoves*SECS_TO_NOMINALS*du;
			}

			_currentBrick.update(du);

			// If current brick is colliding, 
			// make it stuck and check for fullline.
			_checkBrickCollition();
		},
		render : function (ctx) {
			util.strokeBox(ctx, _cx, _cy, _width, _height, 'red');
			_currentBrick.render(ctx);
			_bottomBrick.render(ctx);

			for (i in _stuckBricks) { _stuckBricks[i].render(ctx); }
		},
		getBottom : function() {
			return new Brick();
		}
	};
};
