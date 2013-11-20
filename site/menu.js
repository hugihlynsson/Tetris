var boxstartx = g_canvas.width/2-75;
var boxstarty = g_canvas.height/2 - 150;
var boxheight = 30;
var boxwidth = 150;
var buttonnr = 2;
var buttonname = ["single player", "two player"];
var clickbutton = [0, 0];


function menu(ctx){


    util.clearCanvas(ctx);
    util.fillBox(ctx, 0, 0, g_canvas.width, g_canvas.height, g_color.bg);



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