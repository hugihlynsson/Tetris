// ======
// TETRIS
// ======
/*

A sort-of-playable version of the classic arcade game.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// // ====================
// // CREATE INITIAL SHIPS
// // ====================

// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}


// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


var playField = new Field(10,20);
var blockClock = 15;
var clock = 0;


// Dirty, dirty programming
var KEY_FAST = keyCode('S');

var KEY_PLAY = keyCode('h');

// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {





    if(g_gamestyle === 1) {
        processDiagnostics();

        var speed = 1;

        if(eatKey(KEY_FAST))
        {
           speed = 10;
        }

        clock += 1 * speed * du;

        if(clock >= blockClock)
        {

            playField.tick();
        }
        
        clock = clock % blockClock;

        playField.update();
    }
    //entityManager.update(du);
}

// GAME-SPECIFIC DIAGNOSTICS

var g_allowMixedActions = true;
var g_useGravity = false;
var g_useAveVel = true;
var g_renderSpatialDebug = false;

var KEY_MIXED   = keyCode('M');;
var KEY_GRAVITY = keyCode('G');
var KEY_AVE_VEL = keyCode('V');
var KEY_SPATIAL = keyCode('X');

var KEY_HALT  = keyCode('H');
var KEY_RESET = keyCode('R');

var KEY_0 = keyCode('0');

var KEY_1 = keyCode('1');
var KEY_2 = keyCode('2');

var KEY_K = keyCode('K');

function processDiagnostics() {

    if (eatKey(KEY_MIXED))
        g_allowMixedActions = !g_allowMixedActions;

    if (eatKey(KEY_GRAVITY)) g_useGravity = !g_useGravity;

    if (eatKey(KEY_AVE_VEL)) g_useAveVel = !g_useAveVel;

    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

}


// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`


// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

    //entityManager.render(ctx);
    if(g_gamestyle === 0){
        menu(ctx);
    }
    
    if (g_gamestyle === 1){
        playField.render(ctx);
    }

    if (g_renderSpatialDebug) spatialManager.render(ctx);
}


function menu(ctx){

    util.clearCanvas(ctx);
    util.fillBox(ctx, 0, 0, g_canvas.width, g_canvas.height, "black");
    util.fillBox(ctx,  g_canvas.width/2-75, 50, 150, 30, "orange");
    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = "white";
    ctx.font="bold 20px Arial";
    ctx.fillText("PLAY press 1", 80, 70);

    if(eatKey(KEY_1)){
        util.clearCanvas(ctx);
        ctx.fillStyle = oldStyle;
        g_gamestyle = 1;
    }
}


// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {

    };

}

var g_sprites = {};

function preloadDone() {

    entityManager.init();

    main.init();
}

entityManager.init();

main.init();

// Kick it off
// requestPreloads();
