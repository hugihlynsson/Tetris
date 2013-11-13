



function menu(ctx){

    util.clearCanvas(ctx);
    util.fillBox(ctx, 0, 0, g_canvas.width, g_canvas.height, "black");


    util.fillBox(ctx,  g_canvas.width/2-75, 50, 150, 30, "orange");
    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = "white";
    ctx.font="bold 20px Arial";
    ctx.fillText("Single Player", g_canvas.width/2-75, 50+20);


    util.fillBox(ctx,  g_canvas.width/2-75, 100, 150, 30, "orange");
    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = "white";
    ctx.font="bold 20px Arial";
    ctx.fillText("Two Player", g_canvas.width/2-75, 100+20);


    var mousex = g_mouseX;
    var mousey = g_mouseY;

    var clickbutton1 = buttonclick(mousex, mousey, g_canvas.width/2-75, 50, 30, 150);

    var clickbutton2 = buttonclick(mousex, mousey, g_canvas.width/2-75, 100, 30, 150);




    if(eatKey(KEY_1) || (clickbutton1 && g_button)){
        util.clearCanvas(ctx);
        ctx.fillStyle = oldStyle;
        g_gamestyle = 1;
        fieldManager.init();
    }

        if(eatKey(KEY_2) || (clickbutton2 && g_button)){
        util.clearCanvas(ctx);
        ctx.fillStyle = oldStyle;
        g_gamestyle = 2;
        fieldManager.init();
    }
}

function buttons(nr){

    for(var i = 0; i < nr; i++){
        
        util.fillBox(ctx,  g_canvas.width/2-75, 50, 150, 30, "orange");

    }

}


function buttonclick(mousex, mousey, boxstartx, boxstarty, boxheight, boxwidth){
    if(((mousex >= boxstartx) && (mousex <= boxstartx+boxwidth)) && 
        ((mousey >= boxstarty) && (mousey <= boxstarty+boxheight))){
            return true;
    }
    else return false;

}