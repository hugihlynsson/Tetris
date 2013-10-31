// New playing field with width and height
function Field(width, height)
{
	// Initialize playfield
	for(var i = 0; i < height; ++i)
	{
		for(var j = 0; j < width; ++j)
		{
			this.fieldArray[i][j] = 0;
		}
	}
}

Field.prototype.fieldArray = [];

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
Field.prototype.nextField = function (obj) {
	var form = obj['form'];
	var width = form[0].length;
	var height = form.length;

	var x = obj.posX;
	var y = obj.posY;

	// Nasty hack to clone the array
	var nextField = fieldArray.slice(0);

	// Loop through playfield at given position
	// for tetris object
	for (var i = 0; i < height; ++i)
	{
		for(var j = 0; j < width; ++i)
		{
			nextField[i+y][j+x] += form[i][j];
		}
	}

	return nextField;
};