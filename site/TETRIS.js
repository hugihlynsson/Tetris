// ======
// TETRIS
// ======

// =================
// UPDATE SIMULATION
// =================

// GAME-SPECIFIC UPDATE LOGIC
function updateSimulation(du) {

    processDiagnostics();
    fieldManager.update(du);
}

// GAME-SPECIFIC DIAGNOSTICS

var g_allowMixedActions = true;
var g_useGravity = false;
var g_useAveVel = true;
var g_renderSpatialDebug = false;
var g_renderDebugNums = false;
var g_easeBrick = false;

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

var KEY_DEBUG_NUMS = keyCode('T');
var KEY_EASE = keyCode('E');

function processDiagnostics() {

    if (eatKey(KEY_MIXED)) g_allowMixedActions = !g_allowMixedActions;

    if (eatKey(KEY_GRAVITY)) g_useGravity = !g_useGravity;

    if (eatKey(KEY_AVE_VEL)) g_useAveVel = !g_useAveVel;

    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

    if (eatKey(KEY_DEBUG_NUMS)) g_renderDebugNums = !g_renderDebugNums;

    if (eatKey(KEY_EASE)) g_easeBrick = !g_easeBrick;

}

// =================
// RENDER SIMULATION
// =================

// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

    fieldManager.render(ctx);

    if (g_isUpdatePaused) menus.drawPause(ctx);

    if (g_renderSpatialDebug) spatialManager.render(ctx);
}

// =============
// PRELOAD STUFF
// =============

function preloadDone() {

    main.init();
}
main.init();
fieldManager.init();

var sounds = new SoundManager();
sounds.add('tetris', 'sounds/tetris_song_halldor.m4a');
//sounds.add('explosion', sounds/nameofthesong);
sounds.play('tetris', true);
var highscores = new Highscore();