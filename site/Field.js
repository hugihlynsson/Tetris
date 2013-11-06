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
			_fieldArray[i][j] = 0;

			// FOR TESTING PURPOSES
			// TODO
			// REMOVE
			if(i === 14) _fieldArray[i][j] = 1;
		}
	}

// Add tetris object values to playfield

	var _size = 20;

	var _activeBlock = null;

	var _shouldUpdate = false;

	var _setActiveBlock = function (block) {
		_activeBlock = block;
	};

	var block = new Block({
		form : [[0, 1, 0],
				[1, 1, 1]],
		posX: 3,
		posY: -1,
		rotation: 0,
		color: 'red'
	});

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
				nextArray[i + pos.y][j + pos.x] += form[i][j];
			}
		}
	
		return nextArray;
	};

	var isColliding = function (block) {
		var form = block.getForm();
		var width = block.getWidth();
		var height = block.getHeight();
		var pos = block.getPos();

		for(var i = 0; i < height; ++i)
		{
			for(var j = 0; j < width; ++j)
			{
				if(_fieldArray[pos.y+i][pos.x+j] !== 0
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

	return {
		requestUpdate : function () {
			_shouldUpdate = true;
		},
		setActiveBlock : function (block) {
			_activeBlock = block;
		},
		update : function () {
			if(_shouldUpdate)
			{
				// Move the block down
				_activeBlock.moveDown();

				if (isColliding(_activeBlock))
				{
					_activeBlock.moveUp();
					// Make a new block

					nextField(_activeBlock);
					_setActiveBlock(new Block({
							form : [[0, 1, 0],
									[1, 1, 1]],
							posX: 3,
							posY: 3,
							rotation: 0,
							color: 'red'
						}));

				}
				
				_shouldUpdate = false;
			}

			if(eatKey(KEY_LEFT))
			{
				_activeBlock.nudgeLeft();
			}
			if(eatKey(KEY_RIGHT))
			{
				_activeBlock.nudgeRight();
			}
		},
		render : function (ctx) {
			_activeBlock.render(ctx);

			var field = _fieldArray;
			var fieldWidth = field[0].length;
			var fieldHeight = field.length;
		
			var pix = _size;

			ctx.fillStyle = 'rgb(220, 51, 51)';

			// Render all 'stuck' blocks

			for(var i = 0; i < fieldHeight; ++i)
			{
				for(var j = 0; j < fieldWidth; ++j)
				{
					var block = field[i][j];
					
					var x = _size * j;
					var y = _size * i;

					if(block === 1)
					{
						ctx.fillRect(x, y, _size, _size);
					}

					var old = ctx.fillStyle;
					ctx.fillStyle = "#FFF";
					ctx.fillText(block, x + _size/2, y + _size/2);
					ctx.fillStyle = old;
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

