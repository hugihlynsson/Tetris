
var util = {

// CANVAS OPS
// ==========

clearCanvas: function (ctx) {

    var prevfillStyle = ctx.fillStyle;
    ctx.fillStyle = g_color.bg;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = prevfillStyle;
},

strokeCircle: function (ctx, x, y, r) {

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
},

fillCircle: function (ctx, x, y, r) {

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
},

fillBox: function (ctx, x, y, w, h, style) {

    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = style;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = oldStyle;
},

fillRoundedBox: function (ctx, x, y, w, h, r, style) {

    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = style;
    // Draw two boxes that fill all but the corners:
    ctx.fillRect(x, y+r, w, h-r*2);
    ctx.fillRect(x+r, y, w-r*2, h);
    // Draw rounded cornser, first top left:
    this.fillCircle(ctx, x+r, y+r, r);
    // Top right:
    this.fillCircle(ctx, x+w-r, y+r, r);
    // Bottom left:
    this.fillCircle(ctx, x+r, y+h-r, r);
    // Bottom right:
    this.fillCircle(ctx, x+w-r, y+h-r, r);
    ctx.fillStyle = oldStyle;
},

drawButton: function (ctx, x, y, text, isSmall) {

    var width = (isSmall) ? 36 : 150;
    this.fillRoundedBox(ctx,  x, y + 2, width, 30, 5, g_color.redShadow);
    this.fillRoundedBox(ctx,  x, y    , width, 30, 5, g_color.red);
    ctx.fillStyle = "white";
    ctx.font = "100 20px Helvetica";
    ctx.textAlign = "center";
    ctx.fillText(text, x + width/2, y + 22);
},

// Generates a random color value triple
randomColor: function (from, to) {
    var colString = "";

    if(from > to)
    {
        var temp = from;
        from = to;
        to = temp;
    }

    for(var j = 0; j < 3; j++)
    {
        // Random value in range
        colString += Math.floor(from + (Math.random() * (to-from)));
        if (j !== 2) colString += ", ";
    }

    return colString;
}

};
