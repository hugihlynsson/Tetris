// ===========
// BLOCK CLASS
// ===========

var Block = function (size, fieldX, fieldY, column, form, color)
{
	// Private variables and methods:

	// Initialize instance variables:
	var _size = size;
	var _fieldX = fieldX;
	var _fieldY = fieldY;
	var _column = column;
	var _form = form;
	var _color = color;
	var _row = 0;

	var _shouldEase = true;

	var _rotate = function () {
		_form = _rotateRight();
	};

	var _rotateLeft = function () {
		for(var i = 0; i < 3; ++i)
		{
			_form = _rotateRight();
		}
	};

	var _rotateRight = function () {

		var old = _form;
		var rotated = [];

		for (var i = 0; i < old[0].length; i++)
		{
			rotated.push([]);
		}

		// Array magic!
		for (var i = 0; i < old.length; ++i)
		{
			for (var j = 0; j < old[0].length; ++j)
			{
				rotated[j][old.length - 1 -i] = old[i][j];
			}
		}
		
		return rotated;
	};

	// Public methods:
	// TODO: Maybe make some direct mapping to functions indirect
	//       to get a better understanding of what is happening?
	//       Setters and getters should propably not be private functions.
	return {
		// Getters and setters:
		getForm: function () { return _form; },
		getHeight: function () { return _form.length; },
		getWidth: function () { return _form[0].length; },
		getColor: function () { return _color; },
		getPos: function () { return { x: _column, y: _row }; },
		nudgeLeft: function () { _column -= 1; },
		nudgeRight: function () { _column += 1; },
		moveUp: function () { _row -= 1; },
		moveDown: function () { _row += 1; },
		// Actual methods:
		rotate: _rotate,
		rotateLeft : _rotateLeft,
		update: function () { 
			//TODO: do something or remove
		},
		// Override x and y are optional and can be used to render
		// block at a specific position.
		render: function (ctx, overrideX, overrideY) {
			var width = _form[0].length;
			var height = _form.length;

			var ease = 0;

			for (var i = 0; i < height; ++i)
			{
				for (var j = 0; j < width; ++j)
				{
					if (_form[i][j])
					{
						var oldStyle = ctx.fillStyle;

						ctx.fillStyle = _color;
						if (overrideX) 
						{
							ctx.fillRect(
								overrideX + j*_size, 
								overrideY + i*_size + ease, 
								_size, _size
							);
						}
						else 
						{
							ctx.fillRect(
								_fieldX + (_column + j) * _size, 
								_fieldY + (_row + i) * _size + ease, 
								_size, _size
							);
						}
						ctx.fillStyle = oldStyle;
					}
				}
			}
		}
	};

};