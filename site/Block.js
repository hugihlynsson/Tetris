function Block(descr)
{
	var _block = {};

	var _blockForms = {
		0: [[1, 1, 1, 1]],

		1: [[0, 1, 0],
			[1, 1, 1]],

		2: [[1, 1],
			[1, 1]],

		3: [[0, 1, 1],
			[1, 1, 0]],

		4: [[1, 1, 0],
			[0, 1, 1]]
	}

	var _size = 30;

	var _randomBlock = function () {
		var forms = util.getKeys(_blockForms);
		var randomForm = Math.floor(util.randRange(0, 5));
		var rotation = Math.floor(util.randRange(0, 4));

		var x = 4;
		var y = 0;

		return {
			posX: x,
			posY: y,
			formName: randomForm,
			rotation: rotation,
			color: 'red'};
	};

	// Check if block should be random
	if (descr === undefined)
	{
		var descr = _randomBlock();
	}

	// Build the actual block
	for(var i in descr)
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
		console.log(_block.form);
		var rotated = [];

		for(var i = 0; i < old[0].length; i++)
		{
			rotated.push([]);
		}

		//  			   old.dálkar = new.raðir
		//	rotated = [[], …, []]

		for(var i = 0; i < old.length; ++i)
		{
			for(var j = 0; j < old[0].length; ++j)
			{
				console.log();
				rotated[old[0].length-j-1][i] = old[i][j];
			}
		}
		
		return rotated;
	};

	var rotateLeft = function () {
		_block.rotation = (_block.rotation - 1) % 4;
		
		for(var i = 0; i < 3; ++i)
		{
			_block.form = _rotateRight();
		}


	};

	var getForm = function () {
		return _block.form;
	};

	var getPos = function () {
		return {x: _block.posX,
			y: _block.posY}
	};

	var getHeight = function () {
		return _block.form.length;
	};

	var getWidth = function () {
		return _block.form[0].length;
	};

	var update = function () {

	};

	var render = function (ctx) {
		var width = _block.form[0].length;
		var height = _block.form.length;

		for(var i = 0; i < height; ++i)
		{
			for(var j = 0; j < width; ++j)
			{
				var block = _block.form[i][j];

				if (block === 1)
				{
					ctx.fillRect((_block.posX + j) * _size, (_block.posY + i) * _size, _size, _size);
				}
			}
		}
	};

	return {
		nudgeLeft: nudgeLeft,
		nudgeRight: nudgeRight,
		moveUp: moveUp,
		moveDown: moveDown,
		getPos: getPos,
		getForm: getForm,
		getHeight: getHeight,
		getWidth: getWidth,
		rotate: rotate,
		rotateLeft: rotateLeft,
		update: update,
		render: render,
		_block: _block
	};

}