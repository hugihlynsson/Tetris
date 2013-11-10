// ============
// FIELD OBJECT
// ============

// New playing field with width and height
var Field = function (x, y, width, height, columns)
{
	// Private variables and methods:

	// Initialize instance variables:
	var _x = x;
	var _y = y;
	var _width = width;
	var _height = height;
	var _columns = columns;

	// Create the fields matrix:
	var _unitSize = Math.round(_width / _columns);
	var _rows = Math.round(_height / _unitSize);

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

	// Add tetris object values to playfield

	var _activeBlock = new Block();

	var _shouldUpdate = false;

	var _renderDebugNums = false;

	var _setActiveBlock = function (block) {
		_activeBlock = block;
	};

	var nextField = function (block) {
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
				if (form[i][j] === 1) nextArray[i + pos.y][j + pos.x][0] = 1;
				
				// We shall colourize ye olde matrix with
				// thine *yarr* colour:
				if (form[i][j] === 1)
				{
					nextArray[i + pos.y][j + pos.x][1] = block.getColor();
				}
			}
		}
	
		return nextArray;
	};

	var getWidth = function () {
		return _fieldArray[0].length;
	};

	var getHeight = function () {
		return _fieldArray.length;
	};

	var isColliding = function (block) {
		var form = block.getForm();
		var width = block.getWidth();
		var height = block.getHeight();
		var pos = block.getPos();

		// Check for collision with bottom:
		if((pos.y + height) > getHeight()) return true;

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

	var noEase = function () {
		_activeBlock.noEase();
	};

	var doEase = function () {
		_activeBlock.doEase();
	};

	var ease = function () {
		_activeBlock.ease();
	};

	var KEY_LEFT = keyCode('A');
	var KEY_RIGHT = keyCode('D');
	var KEY_ROTATE = keyCode('W');

	var outOfBounds = function () {
		var pos = _activeBlock.getPos();
		var width = _activeBlock.getWidth();
		var height = _activeBlock.getHeight();
		return (
			(getWidth() < (pos.x + width)) || 
			(pos.x < 0) || 
			(isColliding(_activeBlock)) || 
			(isColliding(_activeBlock))
		);
	};

	var checkForLine = function () {
		for (var i = 0; i < getHeight(); ++i)
		{
			var lineSum = 0;
			
			for (var j = 0; j < getWidth(); ++j)
			{
				if (_fieldArray[i][j][0] > 0)
				{
					lineSum++;
				}
			}

			if (lineSum === getWidth())
			{
				removeLine(i);
			}
		}
	};

	var removeLine = function (lineNumber) {

		for (var i = getHeight()-1; i > 1; --i)
		{
			console.log(i, i-1);
			_fieldArray[i] = _fieldArray[i];

			if (i <= lineNumber)
			{
				for (var j = 0; j < getWidth(); ++j)
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
		for (var j = 0; j < getWidth(); ++j)
		{
			_fieldArray[0][j][0] = 0;
		}
	};


	var _renderDebugNums = function (ctx) {
		for (var i = 0; i < _rows; ++i)
		{
			for (var j = 0; j < _columns; ++j)
			{
				var old = ctx.fillStyle;
				ctx.fillText(
					_fieldArray[i][j][0], 
					_unitSize * j + _unitSize/2, 
					_unitSize * i + _unitSize/2
				);
				ctx.fillStyle = old;
			}
		}
	}

	// Public methods:
	return {
		requestUpdate : function () {
			_shouldUpdate = true;
		},
		setActiveBlock : function (block) {
			_activeBlock = block;
		},
		getWidth: getWidth,
		getHeight: getHeight,
		noEase: noEase,
		doEase: doEase,
		ease: ease,
		tick: function () {
			_shouldUpdate = true;
		},
		update : function () {
			// Check if we're updating. Tetris moves are in a rather discrete
			// time intervals so we will not be doing redundant updates.
			if (_shouldUpdate)
			{
				// Move the block down
				_activeBlock.moveDown();

				if (isColliding(_activeBlock))
				{
					_activeBlock.moveUp();
					// Make a new block
					nextField(_activeBlock);
					_setActiveBlock(new Block());
					checkForLine();
				}

				_shouldUpdate = false;
			}

			if (eatKey(KEY_LEFT))
			{
				// Move block. If illegal, move back:
				_activeBlock.nudgeLeft();
				if (outOfBounds()) _activeBlock.nudgeRight();
			}

			if (eatKey(KEY_RIGHT))
			{
				// Move block. If illegal, move back:
				_activeBlock.nudgeRight();
				if (outOfBounds()) _activeBlock.nudgeLeft();
			}

			if (eatKey(KEY_ROTATE))
			{
				// Rotate block. 
				// If illegal, try again until it gets back to
				// the original position (max 3 times):
				_activeBlock.rotate();
				while (outOfBounds()) _activeBlock.rotate();
			}
		},
		render : function (ctx) {

			// Draw field background:
			util.fillBox(ctx, _x, _y, _width, _height, '#3f5f5f');

			// Render the active block:
			_activeBlock.render(ctx);

			// Render all 'stuck' blocks:
			for (var i = 0; i < _rows; ++i)
			{
				for (var j = 0; j < _columns; ++j)
				{
					if ( _fieldArray[i][j][0])
					{
						ctx.fillStyle = _fieldArray[i][j][1];
						ctx.fillRect(
							_unitSize * j, _unitSize * i,
							_unitSize, _unitSize
						);
					}
				}
			}

			if (g_renderDebugNums) _renderDebugNums(ctx);
		},
	};
}


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

