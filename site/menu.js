// ==========
// MENU CLASS
// ==========

var boxstartx = g_canvas.width/2-80;
var boxstarty = g_canvas.height/2 - 50;
var boxheight = 30;
var boxWidth = 160;
var buttonnr = 3;
var buttonname = ["single player", "two player", "reset highscore"];
var clickbutton = [0, 0, 0];

function menu(ctx){

    var oldstyle = ctx.fillStyle;


    util.clearCanvas(ctx);
    util.fillBox(ctx, 0, 0, g_canvas.width, g_canvas.height, g_color.bg);

    drawTetrisLogo(ctx);
    highscores.render(ctx, g_canvas.width/2, 430);

    buttons(ctx, buttonnr, buttonname);

    drawWASD(ctx, 35, 250);
    drawWASD(ctx, 434, 250, ['I', 'J', 'K', 'L']);

    ctx.fillStyle = oldstyle;
    var buttony = boxstarty;

    for(var i = 0; i < buttonnr; i++){
        clickbutton[i] = buttonclick(buttony);
        buttony += 50;
    }

   if(clickbutton[0] && g_button){
        g_gamestate = "single_player";
        fieldManager.init();
    }
    if(clickbutton[1] && g_button){
        g_gamestate = "two_player";
        fieldManager.init();
    }
    if(clickbutton[2] && g_button){
       highscores.reset();
    }

}

function gameover(ctx){
    util.clearCanvas(ctx);
    util.fillBox(ctx, 0, 0, g_canvas.width, g_canvas.height, g_color.bg);

    var oldstyle = ctx.fillStyle;
    ctx.fillStyle = g_color.gray;
    ctx.font = "100 80px Helvetica";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", g_canvas.width/2, g_canvas.height/2 - 150);
    ctx.font = "100 40px Helvetica";
    ctx.fillText(g_winningscore[0], g_canvas.width/2, g_canvas.height/2 - 100);
    ctx.fillText(g_winningscore[1], g_canvas.width/2, g_canvas.height/2 - 50);
    ctx.fillStyle = oldstyle;

    util.fillRoundedBox(ctx,  g_canvas.width/2 - 80, g_canvas.height/2 + 2, boxWidth, 30, 5, g_color.redShadow);
    util.fillRoundedBox(ctx,  g_canvas.width/2 - 80, g_canvas.height/2, boxWidth, 30, 5, g_color.red);
    ctx.fillStyle = "white";
    ctx.font = "100 20px Helvetica";
    ctx.textAlign = "center";
    ctx.fillText("Menu", g_canvas.width/2 - 80 + boxWidth/2, g_canvas.height/2+20);
    ctx.fillStyle = oldstyle;



    if(g_button){
        g_gamestate = "menu";
        g_button = false;
    }
}

function drawTetrisLogo(ctx) {
    var x = 20;
    var y = 20;
    var unit = 20;

    // T
    var tColor = g_color.red;
    util.fillBox(ctx, x, y, unit*5, unit, tColor);
    util.fillBox(ctx, x+unit*2, y+unit, unit, unit*4, tColor);

    // E
    var eColor = g_color.yellow;
    util.fillBox(ctx, x + unit*6,     y+unit, unit, unit*4, eColor);
    util.fillBox(ctx, x + unit*6, y,          unit*4, unit, eColor);
    util.fillBox(ctx, x + unit*6, y + unit*2, unit*3, unit, eColor);
    util.fillBox(ctx, x + unit*6, y + unit*4, unit*4, unit, eColor);

    // T2
    var t2Color = g_color.blue;
    util.fillBox(ctx, x + unit*11, y, unit*5, unit, t2Color);
    util.fillBox(ctx, x + unit*13, y+unit, unit, unit*4, t2Color);

    // R
    var rColor = g_color.green;
    util.fillBox(ctx, x + unit*17, y, unit, unit*5, rColor);
    util.fillBox(ctx, x + unit*18, y, unit*2, unit, rColor);
    util.fillBox(ctx, x + unit*20, y + unit, unit, unit*2, rColor);
    util.fillBox(ctx, x + unit*18, y + unit*3, unit*2, unit, rColor);
    util.fillBox(ctx, x + unit*20, y + unit*4, unit, unit*1, rColor);

    // I
    var iColor = g_color.pink;
    util.fillBox(ctx, x + unit*22, y, unit, unit*5, iColor);

    // S
    var sColor = g_color.grey;
    util.fillBox(ctx, x + unit*24, y, unit*4, unit, sColor);
    util.fillBox(ctx, x + unit*24, y + unit*2, unit*4, unit, sColor);
    util.fillBox(ctx, x + unit*24, y + unit*4, unit*4, unit, sColor);
    util.fillBox(ctx, x + unit*24, y + unit, unit, unit, sColor);
    util.fillBox(ctx, x + unit*27, y + unit*3, unit, unit, sColor);

}

function drawWASD (ctx, x, y, buttons) {

    var buttons = buttons || ['W', 'A', 'S', 'D'];

    var xDist = 44;
    var yDist = 50;

    util.drawButton(ctx, x + xDist  , y        , buttons[0], 'small'); // W
    util.drawButton(ctx, x          , y + yDist, buttons[1], 'small'); // A
    util.drawButton(ctx, x + xDist  , y + yDist, buttons[2], 'small'); // S
    util.drawButton(ctx, x + xDist*2, y + yDist, buttons[3], 'small'); // D
}


function buttons(ctx, nr, name){

    var buttony = boxstarty;
    boxWidth = 160;
    for(var i = 0; i < nr; i++){

        // Render a small shadow on the 'button':
        util.fillRoundedBox(ctx,  boxstartx, buttony+2, boxWidth, 30, 5, g_color.redShadow);
        util.fillRoundedBox(ctx,  boxstartx, buttony, boxWidth, 30, 5, g_color.red);
        ctx.fillStyle = "white";
        ctx.font = "100 20px Helvetica";
        ctx.textAlign = "center";
        ctx.fillText(name[i], boxstartx + boxWidth/2, buttony+20);
        buttony += 50;
    }

}


function buttonclick(button_y){
    if(((g_mouseX >= boxstartx) && (g_mouseX <= boxstartx+boxWidth)) &&
        ((g_mouseY >= button_y) && (g_mouseY <= button_y+boxheight))){
            return 1;
    }
    else return 0;

}


// Define callable object (because all above functions are in global scope which is not too smooth):
var menus = {
    drawPause: function (ctx) {
    util.fillBox(ctx, 0, 0, g_canvas.width, g_canvas.height, 'rgba(0,0,0,0.8)');
        ctx.fillStyle = "white";
        ctx.font = "100 20px Helvetica";
        ctx.textAlign = "center"
        ctx.fillText('Game paused', g_canvas.width/2,  g_canvas.height/2);
    },
}
