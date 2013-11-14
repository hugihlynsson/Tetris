// ===========
// FIELD CLASS
// ===========

// A field 'class'
var Field = function (x, y, width, height, columns, control)
{
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

	var _score = new Highscore(_x, _y-_unitSize, g_color.green, 16, 'Helvetica');

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
				if (_count > _limit) {
					_count = 0;
					_hasFinished = true;
				}
			},
			hasFinished : function () { 
				if (_hasFinished) {
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
			// FOR TESTING PURPOSES
			// TODO
			// REMOVE
			//if(i === height-1) _fieldArray[i][j] = 1;
			//if(j === 0 || j === width-1) _fieldArray[i][j] = 1;
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
			(_columns < (pos.x + width)) || 
			(pos.x < 0) || 
			(isColliding(_activeBlock)) || 
			(isColliding(_activeBlock))
		);
	};

	var _checkForLine = function () {
		for (var i = 0; i < _rows; ++i)
		{
			var lineSum = 0;
			
			for (var j = 0; j < _columns; ++j)
			{
				if (_fieldArray[i][j][0] > 0) lineSum++;
			}

			if (lineSum === _columns) _removeLine(i); 
		}
	};

	var _removeLine = function (lineNumber) {

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
		_score.addScore(100);
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

	// Public methods:
	return {
		update : function (du) {
			// Check if we're updating. Tetris moves are in a rather discrete
			// time intervals so we will not be doing redundant updates.

	        var speed = (eatKey(_control.fast)) ? 10 : 1;
	        _clock.tick(speed * du);

			if (_clock.hasFinished())
			{
				// TODO: implement better _blockClock updating/abstraction with
				// less hardcoded values.
				// Update blockClock according to score:

				// Increment score:
				_score.addScore(1);

				// Move the block down
				_activeBlock.moveDown();

				if (isColliding(_activeBlock))
				{
					_activeBlock.moveUp();
					// Make a new block
					_nextField(_activeBlock);
					_activeBlock = _nextBlock;
					_nextBlock = fieldManager.getNewBlock(
						_unitSize, 
						_x, _y, 
						Math.floor(_columns/2)
					);
					_checkForLine();
				}

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
				// Rotate block. If illegal, try again until it gets
				// back to the original position (max 3 times):
				_activeBlock.rotate();
				while (_outOfBounds()) _activeBlock.rotate();
			}
		},
		render : function (ctx) {

			// Draw field background:
			util.fillBox(ctx, _x, _y, _width, _height, g_color.fieldBg);

			// Render the active block:
			_activeBlock.render(ctx);

			// Render the next block:
			ctx.fillStyle = _nextBlock.getColor();
			ctx.fillText('NEXT:', _x, _y - _unitSize*3 - 7);
			_nextBlock.render(ctx, _x + _width - _unitSize*4, _y - _unitSize*4);

			// Render all 'stuck' blocks:
			for (var i = 0; i < _rows; ++i)
			{
				for (var j = 0; j < _columns; ++j)
				{
					if ( _fieldArray[i][j][0])
					{
						ctx.fillStyle = _fieldArray[i][j][1];
						ctx.fillRect(
							_x + _unitSize*j, _y + _unitSize*i,
							_unitSize, _unitSize
						);
					}
				}
			}

			_score.render(ctx);

			if (g_renderDebugNums) _renderDebugNums(ctx);
		}
	};
};


// Collision function that takes a tetris object
// and adds it to the current playfield, and returns
// true if the object is colliding with the
// playfield

// A tetris object should hold a two dimensional array
// of 1s and 0s representing the form of the object

// It should also have top left placement coordinates
// and values holding representational information,
// like color, dropshadow, sprite goodness etc.

// e.g.
// {
//	form :  [[0,1,0],
//			[1,1,1]],
//	posX:   0,
//	posY:   4,
//	color:  'blue'
// }

