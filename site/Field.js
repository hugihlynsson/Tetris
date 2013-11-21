// ===========
// FIELD CLASS
// ===========

// A field 'class'
var Field = function (x, y, width, height, columns, control){

	// Private variables and methods:

	// Initialize instance variables:
	var _x = x;
	var _y = y;
	var _width = width;
	var _height = height;
	var _columns = columns;
	var _control = control;
	var _unitSize = Math.round(_width / _columns);
	var _rows = Math.round(_height / _unitSize);
	var _explosions = [];

	var _gameover = false;

	var _score = new Score(_x, _y-_unitSize, 'white', 16, 'Helvetica');

	var _nextBlock = fieldManager.getNewBlock(
		_unitSize, _x, _y, Math.floor(_columns/2)
	);

	var _activeBlock = fieldManager.getNewBlock(
		_unitSize, _x, _y, Math.floor(_columns/2)
	);

	var _linesCleared = 0;

	var Clock = function (limit) {

		var _limit = limit;
		var _count = 0;
		var _hasFinished = false;

		return {
			tick : function (x) {
				_count += (x) ? x : 1;
				if (_count > _limit)
				{
					_count = 0;
					_hasFinished = true;
				}
			},

			hasFinished : function () {

				if (_hasFinished)
				{
					_hasFinished = false;
					return true;
				};
				return false;
			},
			setLimit : function (limit) {

				_limit = limit;
			}
		};
	};

	var _baseClockLimit = 20;
    var _clock = new Clock(_baseClockLimit);

	var _fieldArray = [];

	// Initialize playfield:
	for (var i = 0; i < _rows; ++i)
	{
		_fieldArray.push([]);
		for (var j = 0; j < _columns; ++j)
		{
			_fieldArray[i].push([]);
			_fieldArray[i][j][0] = 0;
		}
	}

	var _shouldUpdate = false;

	var _nextField = function (block) {

		if (block === null) return _fieldArray;

		var form = block.getForm();
		var width = form[0].length;
		var height = form.length;

		var pos = block.getPos();

		// Nasty hack to clone the array:
		var nextArray = _fieldArray.slice(0);

		// Loop through playfield at given position
		// for tetris object:
		for (var i = 0; i < height; ++i)
		{
			for (var j = 0; j < width; ++j)
			{
				if (form[i][j]) nextArray[i+pos.y][j+pos.x][0] = 1;

				// We shall colourize ye olde matrix with
				// thine *yarr* colour:
				if (form[i][j])
				{
					nextArray[i+pos.y][j+pos.x][1] = block.getColor();
				}
			}
		}

		return nextArray;
	};

	var _createExplosion = function (x, y) {
		_explosions.push(new Explosion(x, y));
	};

	var isColliding = function (block) {

		var form = block.getForm();
		var width = block.getWidth();
		var height = block.getHeight();
		var pos = block.getPos();

		// Check for collision with bottom:
		if((pos.y + height) > _rows) return true;

		for (var i = 0; i < height; ++i)
		{
			for (var j = 0; j < width; ++j)
			{
				if (_fieldArray[pos.y+i][pos.x+j][0] !== 0 && form[i][j] !== 0)
				{
					return true;
				}
			}
		}
		return false;
	};

	var _outOfBounds = function () {

		var pos = _activeBlock.getPos();
		var width = _activeBlock.getWidth();
		var height = _activeBlock.getHeight();
		return (
			(_isAtRightEdge() ||
			(pos.x < 0) ||
			(isColliding(_activeBlock))));
		};

	var _isAtRightEdge = function () {

		var pos = _activeBlock.getPos();
		var width = _activeBlock.getWidth();
		return (_columns < (pos.x + width));
	};

	var _checkForGameOver = function () {

		for (var j = 0; j < _columns; ++j)
		{
			if (_fieldArray[0][j][0] > 0)
			{
				_gameover = true;
				highscores.add(_score.getScore());
			}
		}
	};

	var _checkForLine = function () {

		var linesRemoved = 0;
		for (var i = 0; i < _rows; ++i)
		{
			var lineSum = 0;

			for (var j = 0; j < _columns; ++j)
			{
				if (_fieldArray[i][j][0] > 0) lineSum++;
			}

			if (lineSum === _columns)
			{
				_removeLine(i);
				linesRemoved += 1;
			}
		}
		var bonus = 100;
		for (var i = 0; i < linesRemoved; i++)
		{
			_score.addScore(bonus);
			bonus *= 2;
		}
	};

	var _removeLine = function (lineNumber) {

		drop.play();
		for(var i = 0; i < 10; i++){
			_createExplosion(x + _unitSize/2 + _unitSize * i, y +_unitSize/2 + _unitSize * lineNumber );
		}

		for (var i = _rows-1; i > 1; --i)
		{
			_fieldArray[i] = _fieldArray[i];
			if (i <= lineNumber)
			{
				for (var j = 0; j < _columns; ++j)
				{
					for (var k = 0; k < _fieldArray[i][j].length; ++k)
					{
						// Three dimensional array copy WOAH!!
						_fieldArray[i][j][k] = _fieldArray[i-1][j][k];
					}
				}
			}
		}

		// Erase the top line:
		for (var j = 0; j < _columns; ++j)
		{
			_fieldArray[0][j][0] = 0;
		}

		// Update score and clock:
		_linesCleared += 1;
		var topSpeed = 4;
		if (_linesCleared > _baseClockLimit - topSpeed) {
			_clock.setLimit = topSpeed;
		}
		else {
			_clock.setLimit(_baseClockLimit - _linesCleared);
		}

	};


	var _renderDebugNums = function (ctx) {

		for (var i = 0; i < _rows; ++i)
		{
			for (var j = 0; j < _columns; ++j)
			{
				var old = ctx.fillStyle;
				ctx.fillStyle = 'white';
				ctx.font = '5pt Helvetica';
				ctx.fillText(
					_fieldArray[i][j][0],
					_x + _unitSize*j + _unitSize/2 - 2,
					_y + _unitSize*i + _unitSize/2 + 2
				);
				ctx.fillStyle = old;
			}
		}
	};

	var _renderNextBlock = function (ctx) {

        ctx.font = "100 16px Helvetica";
        ctx.textAlign = "left"
		ctx.fillStyle = _nextBlock.getColor();
		ctx.fillText('NEXT:', _x, _y - _unitSize*3 - 7);
		_nextBlock.render(ctx,
						  _x + _width - _unitSize*4,
						  _y - _unitSize*4);
	};

	var _moveActiveBrickDown = function (ctx) {
		_activeBlock.moveDown();
		if (isColliding(_activeBlock)) {
			_activeBlock.moveUp();
			_nextField(_activeBlock);
			_activeBlock = _nextBlock;
			_nextBlock = fieldManager.getNewBlock(
				_unitSize,
				_x, _y,
				Math.floor(_columns/2)
			);
			_checkForLine();
			_checkForGameOver();
			return false;
		}
		return true;
	};

	// Public methods:
	return {
		update : function (du) {

			if (eatKey(_control.fast)) {
				while(_moveActiveBrickDown());
			}

	        var speed = 1;
	        _clock.tick(speed * du);

			// Check if we're updating. Tetris moves are in a rather discrete
			// time intervals so we will not be doing redundant updates.

			if (_clock.hasFinished())
			{
				// Move the block down
				_moveActiveBrickDown();

				_shouldUpdate = false;
			}

			if (eatKey(_control.left))
			{
				// Move block. If illegal, move back:
				_activeBlock.nudgeLeft();
				if (_outOfBounds()) _activeBlock.nudgeRight();
			}

			if (eatKey(_control.right))
			{
				// Move block. If illegal, move back:
				_activeBlock.nudgeRight();
				if (_outOfBounds()) _activeBlock.nudgeLeft();
			}

			if (eatKey(_control.rotate))
			{
				// Rotate block. If illegal, then block must be on right
				// side of playing field, so block is nudged to the left

				var nudgeCount = 0;

				_activeBlock.rotate();

				for (var i = 0; _isAtRightEdge() && i < 3; ++i)
				{
					// Nudge block until it's not on the screen's edge
					_activeBlock.nudgeLeft();
					nudgeCount++;
				}

				// At new block pos and rotation, check if we're
				// colliding with playfield
				if(isColliding(_activeBlock))
				{
					// Re-do our nudging and rotation,
					// thus banning that move
					for(var i = 0; i < nudgeCount; ++i)
					{
						_activeBlock.nudgeRight();
					}
				}

				if(_outOfBounds())
				{
					_activeBlock.rotateLeft();
				}
			}

			for(var i in _explosions)
			{
				var exp = _explosions[i].update(du);
				if(!exp)
				{
					_explosions.splice(i, 1);
					i--;
				}
			}
		},

		render : function (ctx) {

			if(_gameover)ctx.globalAlpha = 0.2;
			// Draw field background:
			util.fillBox(ctx, _x, _y, _width, _height, g_color.fieldBg);

			// Render the active block:
			_activeBlock.render(ctx);

			// Render the next block:
			_renderNextBlock(ctx);

			// Render all 'stuck' blocks:
			for (var i = 0; i < _rows; ++i)
			{
				for (var j = 0; j < _columns; ++j)
				{
					if ( _fieldArray[i][j][0])
					{
						ctx.fillStyle = _fieldArray[i][j][1];
						ctx.fillRect(_x + _unitSize*j,
									 _y + _unitSize*i,
									 _unitSize, _unitSize
						);
					}
				}
			}

			_score.render(ctx);

			if (g_renderDebugNums) _renderDebugNums(ctx);

			if(_gameover)
			{
				var oldstyle = ctx.fillStyle;
				var oldfont = ctx.font;
				var oldalign = ctx.textAlign;
				ctx.globalAlpha = 1;
				ctx.fillStyle = g_color.yellow;
			    ctx.font = "100 20px Helvetica";
			    ctx.textAlign = "center";
			    ctx.fillText("Game Over", x + (width/2), height/2);
			    ctx.fillStyle = oldstyle;
			    ctx.font = oldfont;
			    ctx.textAlign = oldalign;
			}

			for(var i in _explosions)
			{
				_explosions[i].render(ctx);
			}
		},
		isgameover : function () {

			return _gameover;
		},
		getscore : function () {

			return _score.getScore();
		}
	};
};

