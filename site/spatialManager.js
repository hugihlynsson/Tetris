/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var spatialManager = {

// "PRIVATE" DATA

_nextSpatialID : 1, // make all valid IDs non-falsey (i.e. don't start at 0)

_entities : [],

unit : 20,

// "private methods and variables:
_drawPoints : function (ctx) {
    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = "white";
    for (var i = 0; i < g_canvas.width; i += this.unit) {
        for (var j = 0; j < g_canvas.height; j += this.unit) {
            ctx.fillRect(i, j, 1, 1);
        }
    }
    ctx.fillStyle = oldStyle;
},

_fields : [],

// PUBLIC METHODS
getClosestY : function (y) {
    return Math.round(y/20)*20;
},

getClosestX : function (x) {
    return Math.round(x/20)*20;
},

getNewSpatialID : function() {

    // TODO: YOUR STUFF HERE!
    return this._nextSpatialID++;
},

register: function(entity) {
    // TODO: YOUR STUFF HERE!
    this._entities[entity.getSpatialID()] = entity;
},

unregister: function(entity) {
    // TODO: YOUR STUFF HERE!
    delete this._entities[entity.getSpatialID()];
},

findEntityInRange: function(posX, posY, radius) {

    // TODO: YOUR STUFF HERE!
    for (var ID in this._entities) {
        var e = this._entities[ID];
        var pos = e.getPos();
        if (util.wrappedDistSq(posX, posY, pos.posX, pos.posY, canvas.width, canvas.height) 
            < util.square(e.getRadius() + radius)) {
            return e;
        }
    }
    return false;
},

render: function(ctx) {
    var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = "red";
    this._drawPoints(ctx);
    
    for (var ID in this._entities) {
        var e = this._entities[ID];
        var pos = e.getPos();
        util.strokeCircle(ctx, pos.posX, pos.posY, e.getRadius());
    }
    ctx.strokeStyle = oldStyle;
}

}
