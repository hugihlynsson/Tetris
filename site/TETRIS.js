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

var KEY_GRAVITY = keyCode('G');
var KEY_AVE_VEL = keyCode('V');

var KEY_HALT  = keyCode('H');
var KEY_RESET = keyCode('R');

var KEY_0 = keyCode('0');

var KEY_1 = keyCode('1');
var KEY_2 = keyCode('2');

var KEY_K = keyCode('K');

var KEY_DEBUG_NUMS = keyCode('T');
var KEY_EASE = keyCode('E');

function processDiagnostics() {

    if (eatKey(KEY_GRAVITY)) g_useGravity = !g_useGravity;

    if (eatKey(KEY_AVE_VEL)) g_useAveVel = !g_useAveVel;

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
sounds.add('explosion', 'sounds/clear_line.m4a');
sounds.add('drop', 'sounds/blip.m4a');
sounds.add('gameOver', 'sounds/game_over.m4a');
sounds.play('tetris', 'loop', 0.7);
var highscores = new Highscore();