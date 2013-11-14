


var boxstartx = g_canvas.width/2-75;
var boxstarty = g_canvas.height/2 - 150;
var boxheight = 30;
var boxwidth = 150;
var buttonnr = 2;
var buttonname = ["single player", "two player"];
var clickbutton = [0, 0];


function menu(ctx){


    util.clearCanvas(ctx);
    util.fillBox(ctx, 0, 0, g_canvas.width, g_canvas.height, g_bgColor);

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

function buttons(ctx, nr, name){

    buttony = boxstarty;

    for(var i = 0; i < nr; i++){

        
        util.fillBox(ctx,  boxstartx, buttony, 150, 30, "orange");
        ctx.fillStyle = "white";
        ctx.font = "bold 20px Arial";
        ctx.fillText(name[i], boxstartx + 20, buttony+20);

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