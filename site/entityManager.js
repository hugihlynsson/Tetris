/*

entityManager.js

A module which handles arbitrary entity-management for "Asteroids"


We create this module as a single global object, and initialise it
with suitable 'data' and 'methods'.

"Private" properties are denoted by an underscore prefix convention.

*/


"use strict";


// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops 
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/


var entityManager = {

// "PRIVATE" DATA

 _bricks : [],
 _boards : [],

// _bShowRocks : true,

// "PRIVATE" METHODS

// _findNearestShip : function(posX, posY) {
//     var closestShip = null,
//         closestIndex = -1,
//         closestSq = 1000 * 1000;

//     for (var i = 0; i < this._ships.length; ++i) {

//         var thisShip = this._ships[i];
//         var shipPos = thisShip.getPos();
//         var distSq = util.wrappedDistSq(
//             shipPos.posX, shipPos.posY, 
//             posX, posY,
//             g_canvas.width, g_canvas.height);

//         if (distSq < closestSq) {
//             closestShip = thisShip;
//             closestIndex = i;
//             closestSq = distSq;
//         }
//     }
//     return {
//         theShip : closestShip,
//         theIndex: closestIndex
//     };
// },

_forEachOf: function(aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
        fn.call(aCategory[i]);
    }
},

// PUBLIC METHODS

// A special return value, used by other objects,
// to request the blessed release of death!
//
KILL_ME_NOW : -1,

// Some things must be deferred until after initial construction
// i.e. thing which need `this` to be defined.
//
deferredSetup : function () {
    this._categories = [];
},

init: function() {
    this._boards[0] = new Board(
        200, 200, 100, 200, 
        16, 8,
        'J'.charCodeAt(0), 'L'.charCodeAt(0), 'I'.charCodeAt(0), 'J'.charCodeAt(0)
    );
},

// fireBullet: function(cx, cy, velX, velY, rotation) {
//     this._bullets.push(new Bullet({
//         cx   : cx,
//         cy   : cy,
//         velX : velX,
//         velY : velY,

//         rotation : rotation
//     }));
// },

// generateRock : function(descr) {
//     this._rocks.push(new Rock(descr));
// },

// generateShip : function(descr) {
//     this._ships.push(new Ship(descr));
// },

// killNearestShip : function(xPos, yPos) {
//     var theShip = this._findNearestShip(xPos, yPos).theShip;
//     if (theShip) {
//         theShip.kill();
//     }
// },

// yoinkNearestShip : function(xPos, yPos) {
//     var theShip = this._findNearestShip(xPos, yPos).theShip;
//     if (theShip) {
//         theShip.setPos(xPos, yPos);
//     }
// },

// resetShips: function() {
//     this._forEachOf(this._ships, Ship.prototype.reset);
// },

// haltShips: function() {
//     this._forEachOf(this._ships, Ship.prototype.halt);
// },	

// toggleRocks: function() {
//     this._bShowRocks = !this._bShowRocks;
// },

update: function(du) {

    for (var i = 0; i < this._bricks.length; i++) {
        this._bricks[i].update(du);
    }
    for (var i = 0; i < this._boards.length; i++) {
        this._boards[i].update(du);
    }

},

render: function(ctx) {

    for (var i = 0; i < this._bricks.length; i++) {
        this._bricks[i].render(ctx);
    }

    for (var i = 0; i < this._boards.length; i++) {
        this._boards[i].render(ctx);
    }

}

};

