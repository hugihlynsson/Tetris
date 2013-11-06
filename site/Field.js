// New playing field with width and height
function Field(width, height)
{
	var _fieldArray = [];
	// Initialize playfield
	for(var i = 0; i < height; ++i)
	{
		_fieldArray.push([]);
		for(var j = 0; j < width; ++j)
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

	var _size = 30;

	var _activeBlock = null;

	var _shouldUpdate = false;

	var _setActiveBlock = function (block) {
		_activeBlock = block;
	};

	// Initial block

	var block = new Block();
	_setActiveBlock(block);

	var nextField = function (block) {
		if (block === null) return _fieldArray;
	
		var form = block.getForm();
		var width = form[0].length;
		var height = form.length;
	
		var pos = block.getPos();
	
		// Nasty hack to clone the array
		var nextArray = _fieldArray.slice(0);
	
		// Loop through playfield at given position
		// for tetris object
		for (var i = 0; i < height; ++i)
		{
			for(var j = 0; j < width; ++j)
			{
				nextArray[i + pos.y][j + pos.x][0] += form[i][j];
				
				// We shall colourize ye olde matrix with
				// the thine *yarr* colour
				if(form[i][j] === 1)
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

		// Check for collision with bottom
		if((getHeight() < (pos.y + height))) return true;

		for(var i = 0; i < height; ++i)
		{
			for(var j = 0; j < width; ++j)
			{
				if(_fieldArray[pos.y+i][pos.x+j][0] !== 0
					&& form[i][j] !== 0)
				{
					return true;
				}
			}
		}
		return false;
	};

	var KEY_LEFT = keyCode('A');
	var KEY_RIGHT = keyCode('D');
	var KEY_ROTATE = keyCode('W');

	var outOfBounds = function () {
		var pos = _activeBlock.getPos();
		var width = _activeBlock.getWidth();
		var height = _activeBlock.getHeight();
		return (getWidth() < (pos.x + width))
		|| (pos.x < 0)
		|| (isColliding(_activeBlock))
		|| (isColliding(_activeBlock));
	};

	var checkForLine = function () {
		for(var i = 0; i < getHeight(); ++i)
		{
			var lineSum = 0;
			
			for(var j = 0; j < getWidth(); ++j)
			{
				lineSum += _fieldArray[i][j][0];
			}

			if(lineSum === getWidth()) removeLine(i);
			console.log(lineSum, getWidth());
		}
	};

	var removeLine = function (lineNumber) {
		for(var k = 0; k < getWidth(); ++k)
		{
			_fieldArray[0][k].push([]);
			_fieldArray[0][k][0] = 0;
		}
		for(var i = lineNumber; i > 0; --i)
		{
			for(var j = 0; j < getWidth(); ++j)
			{
				_fieldArray[i][j] = _fieldArray[i-1][j]
			}
		}
	};

	return {
		requestUpdate : function () {
			_shouldUpdate = true;
		},
		setActiveBlock : function (block) {
			_activeBlock = block;
		},
		getWidth: getWidth,
		getHeight: getHeight,
		tick: function () {
			_shouldUpdate = true;
		},
		update : function () {
			// Check if we're updating. Tetris moves
			// are in a rather discrete time intervals
			// so we will not be doing redundant updates.
			if(_shouldUpdate)
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

			if(eatKey(KEY_LEFT))
			{
				// Begin by moving block left
				_activeBlock.nudgeLeft();

				// Then check it against our collision
				// information, that is the walls of 
				// the playfield and other stuck blocks.
				// If we collide with either, then we redo
				// our move to a 'safe' place.
				if(outOfBounds())
					_activeBlock.nudgeRight();
			}

			if(eatKey(KEY_RIGHT))
			{
				// Same here …
				_activeBlock.nudgeRight();
				if(outOfBounds())
					_activeBlock.nudgeLeft();
			}

			if(eatKey(KEY_ROTATE))
			{
				_activeBlock.rotate();
				if(outOfBounds())
				{
					_activeBlock.rotateLeft();
					_activeBlock.rotateLeft();
				}
				if(outOfBounds())
				{
					_activeBlock.rotate();
				}
			}
		},
		render : function (ctx) {
			_activeBlock.render(ctx);

			var field = _fieldArray;
			var fieldWidth = field[0].length;
			var fieldHeight = field.length;

			var pix = _size;

			// Render all 'stuck' blocks

			for(var i = 0; i < fieldHeight; ++i)
			{
				for(var j = 0; j < fieldWidth; ++j)
				{
					var block = field[i][j][0];
					var color = field[i][j][1];
					
					var x = _size * j;
					var y = _size * i;

					if(block === 1)
					{
						ctx.fillStyle = color;
						ctx.fillRect(x, y, _size, _size);
					}
					/*
					var old = ctx.fillStyle;
					ctx.fillStyle = "#FFF";
					ctx.fillText(block, x + _size/2, y + _size/2);
					ctx.fillStyle = old;
					*/
				}
			}
		}
	}
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
//	form : 	[[0,1,0],
//  		[1,1,1]],
//	posX:   0,
//	posY: 	4,
//	color: 	'blue'
// }

