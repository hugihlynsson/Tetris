// =====
// BLOCK
// =====

var Block = function (size)
{
	// Private variables and methods:
	var _blockForms = {

		0: [[1, 1, 1, 1]],

		1: [[0, 1, 0],
			[1, 1, 1]],

		2: [[1, 1],
			[1, 1]],

		3: [[0, 1, 1],
			[1, 1, 0]],

		4: [[1, 1, 0],
			[0, 1, 1]],

		5: [[0, 1],
			[0, 1],
			[1, 1]],

		6: [[1, 0],
			[1, 0],
			[1, 1]]
	};

	var _blockFormColors = {
		0: '#ff69b4',
		1: '#e9967a',
		2: '#eedd82',
		3: '#66cdaa',
		4: '#00bfff',
		5: '#ffdead',
		6: '#cdc9c9'
	};

	var _size = size || 20;

	var _shouldEase = true;

	var _block = {};

	var _randomBlock = function () {
		var forms = util.getKeys(_blockForms);
		var randomForm = Math.floor(util.randRange(0, 7));
		var rotation = Math.floor(util.randRange(0, 4));

		var x = 4;
		var y = 0;

		return {
			posX: x,
			posY: y,
			formName: randomForm,
			rotation: rotation,
			color: _blockFormColors[randomForm]
		};
	};

	// Check if block should be random:
	var descr = _randomBlock();

	// Build the actual block
	for (var i in descr)
	{
		_block[i] = descr[i];
	}

	_block.form = _blockForms[descr.formName];

	var nudgeLeft = function () {
		_block.posX -= 1;
	};

	var nudgeRight = function () {
		_block.posX += 1; 
	};

	var moveDown = function () {
		_block.posY += 1;
	};

	var moveUp = function () {
		_block.posY -= 1;
	};

	var rotate = function () {
		_block.rotation = (_block.rotation + 1) % 4;
		_block.form = _rotateRight();
	};

	var _rotateRight = function () {

		var old = _block.form;
		var rotated = [];

		for (var i = 0; i < old[0].length; i++)
		{
			rotated.push([]);
		}

		// old.dálkar = new.raðir
		// rotated = [[], …, []]

		for (var i = 0; i < old.length; ++i)
		{
			for (var j = 0; j < old[0].length; ++j)
			{
				rotated[old[0].length-j-1][i] = old[i][j];
			}
		}
		
		return rotated;
	};

	// TODO: Finish this function:
	var _rotateLeft = function () {
		// Broken code:
		// _block.rotation = (_block.rotation - 1) % 4;
		// for(var i = 0; i < 3; ++i)
		// {
		//  _block.form = _rotateRight();
		// }
	};

	var getForm = function () {
		return _block.form;
	};

	var getPos = function () {
		return { 
			x: _block.posX, 
			y: _block.posY
		};
	};

	var getHeight = function () {
		return _block.form.length;
	};

	var getWidth = function () {
		return _block.form[0].length;
	};

	var getColor = function () {
		return _block.color;
	};

	var noEase = function () {
		_shouldEase = false;
	};

	var doEase = function () {
		_shouldEase = true;
	};

	var ease = function () {
		return _shouldEase;
	};

	var update = function () {

	};

	var render = function (ctx) {
		var width = _block.form[0].length;
		var height = _block.form.length;

		// Some easing, soon to be encapsulated
		// in it's own functional premises

		for (var i = 0; i < height; ++i)
		{
			for (var j = 0; j < width; ++j)
			{
				if (_block.form[i][j])
				{
					var oldStyle = ctx.fillStyle;
					
					var ease = 0;

					if (_shouldEase)
					{
						//ease = clock/blockClock;
						//ease = -(Math.cos((ease/2) * Math.PI)) * _size;
					}
					else
					{
						_shouldEase = true;
					}

					ctx.fillStyle = _block.color;
					ctx.fillRect((_block.posX + j) * _size, (_block.posY + i) * _size + ease, _size, _size);
					ctx.fillStyle = oldStyle;
				}
			}
		}
	};

	// Public methods:
	// TODO: Maybe make some direct mapping to functions indirect
	//       to get a better understanding of what is happening?
	//       Setters and getters should propably not be private functions.
	return {
		nudgeLeft: nudgeLeft,
		nudgeRight: nudgeRight,
		moveUp: moveUp,
		moveDown: moveDown,
		getPos: getPos,
		getForm: getForm,
		getHeight: getHeight,
		getWidth: getWidth,
		getColor: getColor,
		rotate: rotate,
		rotateLeft: _rotateLeft,
		noEase: noEase,
		doEase: doEase,
		ease: ease,
		update: update,
		render: render,
		_block: _block
	};

};