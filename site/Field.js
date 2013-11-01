
// New playing field with width and height
function Field(width, height)
{
	this.fieldArray = [];
	// Initialize playfield
	for(var i = 0; i < height; ++i)
	{
		this.fieldArray.push([]);
		for(var j = 0; j < width; ++j)
		{
			this.fieldArray[i][j] = 0;
		}
	}
}

// Square size in pixels
Field.prototype.size = 40;

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

Field.prototype.activeBlock = {};

Field.prototype.collidesWith = function (obj) {	
	var field = this.fieldArray;
	var fieldWidth = field[0].length;
	var fieldHeight = field.length;

	for(var i = 0; i < fieldHeight; ++i)
	{
		for(var j = 0; j < fieldWidth; ++j)
		{
			if(field[j][i] > 1)
			{
				// If an object is colliding with 
				// a previously occupied space
				// it's value should be greater than 1
				return true;
			}
		}
	}

	return false;
};

// Add tetris object values to playfield
Field.prototype.nextField = function () {
	var form = this.activeBlock['form'];
	var width = form[0].length;
	var height = form.length;

	var x = this.activeBlock.posX;
	var y = this.activeBlock.posY;

	// Nasty hack to clone the array
	var nextArray = fieldArray.slice(0);

	// Loop through playfield at given position
	// for tetris object
	for (var i = 0; i < height; ++i)
	{
		for(var j = 0; j < width; ++i)
		{
			console.log(i+y, j+x);
			nextArray[i+y][j+x] += form[i][j];
		}
	}

	return nextArray;
};

Field.prototype.update = function (obj) {
	this.fieldArray = this.nextField(obj);
};

Field.prototype.render = function (ctx) {
	var field = this.fieldArray;
	var fieldWidth = field[0].length;
	var fieldHeight = field.length;

	var pix = this.size;

	for(var i = 0; i < fieldHeight; ++i)
	{
		for(var j = 0; j < fieldWidth; ++j)
		{
			var block = field[i][j];

			if(block === 1)
			{
				ctx.fillStyle = 'rgb(220, 51, 51)';
				ctx.fillRect(0, 0, 10, 10);
			}
		}
	}
};