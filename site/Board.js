// =====
// BRICK
// =====

// Creating a "class" Board
var Board = function (cx, cy, w, h, rows, columns, brickControl, keyControl) {

	// "Private" variables and functions are kept here:
	var _cx = cx;
	var _cy = cy;
	var _width = w;
	var _height = h;
	var _rows = rows;
	var _columns = columns;

	var _brickUnit = _width / _columns;

	var _brickControl = brickControl;
	var _keyControl = keyControl || [];


	var _keyLeft = (keyControl) ? keyControl[0] : 0;
	var _keyRight = (keyControl) ? keyControl[1] : 0;
	var _keyTop = (keyControl) ? keyControl[2] : 0;
	var _keyDown = (keyControl) ? keyControl[3] : 0;

	var _newBrick = function () {
		return new Brick(
			spatialManager.getClosestX(_cx), 
			spatialManager.getClosestX(_cy)-_height/2, 
			_brickUnit, 
			'X',
			_brickControl
		);
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
	var _nudgeBricks = function (x) {
		_currentBrick.nudge(x);
		_bottomBrick.nudge(x);
		for (var i in _stuckBricks) { _stuckBricks[i].nudge(x); }
	};

	// Brick is down, so make a new one:
	var _stickBrick = function() {
		_stuckBricks[_stuckBricks.length] = _currentBrick;
		_currentBrick.stick();
		_currentBrick = _newBrick();
	};

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

			_checkBrickCollition();
			_currentBrick.update(du);
			// If current brick is colliding, 
			// make it stuck and check for fullline.
		},
		render : function (ctx) {
			util.strokeBox(ctx, _cx, _cy, _width, _height, 'red');
			_currentBrick.render(ctx);

			for (var i in _stuckBricks) { _stuckBricks[i].render(ctx); }
		},
	};
};
