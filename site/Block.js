function Block(descr)
{
	var _block = {};

	var _size = 30;

	for(var i in descr)
	{
		_block[i] = descr[i];
	}

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
		update: update,
		render: render
	};

}