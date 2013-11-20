var boxstartx = g_canvas.width/2-75;
var boxstarty = g_canvas.height/2 - 50;
var boxheight = 30;
var boxwidth = 150;
var buttonnr = 2;
var buttonname = ["single player", "two player"];
var clickbutton = [0, 0];

function menu(ctx){


    util.clearCanvas(ctx);
    util.fillBox(ctx, 0, 0, g_canvas.width, g_canvas.height, g_color.bg);


    drawTetrisLogo(ctx);
    highscores.render(ctx, g_canvas.width/2, 400);

    buttons(ctx, buttonnr, buttonname);


    var buttony = boxstarty;

    for(var i = 0; i < buttonnr; i++){
        clickbutton[i] = buttonclick(buttony);
        buttony += 50;

    }



   if(eatKey(KEY_1) || (clickbutton[0] && g_button)){
        g_gamestyle = 1;
        fieldManager.init();
    }

    if(eatKey(KEY_2) || (clickbutton[1] && g_button)){
        g_gamestyle = 2;
        fieldManager.init();
    }

}

function gameover(ctx){
    util.clearCanvas(ctx);
    util.fillBox(ctx, 0, 0, g_canvas.width, g_canvas.height, g_color.bg);
    ctx.fillStyle = "red";
    ctx.font = "100 80px Helvetica";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", g_canvas.width/2, g_canvas.height/2);
    ctx.font = "100 40px Helvetica";
    ctx.fillText(g_winningscore[0], g_canvas.width/2, g_canvas.height/2 + 50);
    ctx.fillText(g_winningscore[1], g_canvas.width/2, g_canvas.height/2 + 100);
    if(g_button){
        g_gamestyle = 0;
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
    util.fillBox(ctx, x + unit*20, y, unit, unit*3, rColor);
    util.fillBox(ctx, x + unit*18, y, unit*2, unit, rColor);
    util.fillBox(ctx, x + unit*18, y + unit*2, unit*2, unit, rColor);
    util.fillBox(ctx, x + unit*19, y + unit*3, unit, unit, rColor);
    util.fillBox(ctx, x + unit*19, y + unit*4, unit*2, unit, rColor);

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



function buttons(ctx, nr, name){

    buttony = boxstarty;

    for(var i = 0; i < nr; i++){

        var boxWidth = 160;
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


function buttonclick(boxstarty){
    if(((g_mouseX >= boxstartx) && (g_mouseX <= boxstartx+boxwidth)) &&
        ((g_mouseY >= boxstarty) && (g_mouseY <= boxstarty+boxheight))){
            return 1;
    }
    else return 0;

}
