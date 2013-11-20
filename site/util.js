// util.js
//
// A module of utility functions, with no private elements to hide.
// An easy case; just return an object containing the public stuff.

"use strict";


var util = {


// RANGES
// ======

clampRange: function(value, lowBound, highBound) {
    if (value < lowBound) {
	value = lowBound;
    } else if (value > highBound) {
	value = highBound;
    }
    return value;
},

wrapRange: function(value, lowBound, highBound) {
    while (value < lowBound) {
	value += (highBound - lowBound);
    }
    while (value > highBound) {
	value -= (highBound - lowBound);
    }
    return value;
},

isBetween: function(value, lowBound, highBound) {
    if (value < lowBound) { return false; }
    if (value > highBound) { return false; }
    return true;
},

// OBJECT KEYS
// ===========

getKeys: function (object) {
    var keys = [];
    for(var i in object)
    {
        if(object.hasOwnProperty(i))
        {
            keys.push(i)
        }
    }
    return keys;
},


// RANDOMNESS
// ==========

randRange: function(min, max) {
    return (min + Math.random() * (max - min));
},


// MISC
// ====

square: function(x) {
    return x*x;
},


// DISTANCES
// =========

distSq: function(x1, y1, x2, y2) {
    return this.square(x2-x1) + this.square(y2-y1);
},

wrappedDistSq: function(x1, y1, x2, y2, xWrap, yWrap) {
    var dx = Math.abs(x2-x1),
	dy = Math.abs(y2-y1);
    if (dx > xWrap/2) {
	dx = xWrap - dx;
    };
    if (dy > yWrap/2) {
	dy = yWrap - dy;
    }
    return this.square(dx) + this.square(dy);
},


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

};
