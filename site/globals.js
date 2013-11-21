// =======
// GLOBALS
// =======

//Evil, ugly (but "necessary") globals, which everyone can use.

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("tetris");
var g_ctx = g_canvas.getContext("2d");
var g_gamestate = "menu";
var g_winningscore = ["player", 0];

// The "nominal interval" is the one that all of our time-based units are
// calibrated to e.g. a velocity unit is "pixels per nominal interval"
//
var NOMINAL_UPDATE_INTERVAL = 16.666;

// Multiply by this to convert seconds into "nominals"
var SECS_TO_NOMINALS = 1000 / NOMINAL_UPDATE_INTERVAL;

var g_bgColor = '#2f4f4f';

var g_color = {
	bg: '#2f4f4f',
	fieldBg: '#3f5f5f',
	green: '#66cdaa',
	red: '#e9967a',
	redShadow: '#a9664a',
	pink: '#ff69b4',
	yellow: '#eedd82',
	blue: '#00bfff',
	sand: '#ffdead',
	gray: '#cdc9c9'
};

