// ===============
// gameOver CLASS
// ===============
"use strict";
// A field 'class'
function gameOver (ctx) {

if( false/*vantar að setja hér */){

	util.clearCanvas(ctx);
    util.fillBox(ctx, 0, 0, g_canvas.width, g_canvas.height, "black");



    util.fillBox(ctx,  g_canvas.width/2-75, 50, 150, 30, "DeepPink");
    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = "white";
    ctx.font="bold 50px Arial";
    ctx.fillText("Game Over", g_canvas.width/2-75, 50+20);


    util.fillBox(ctx,  g_canvas.width/2-75, 100, 150, 30, "DeepPink ");
    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = "white";
    ctx.font="bold 20px Arial";
    ctx.fillText("Go to menu", g_canvas.width/2-75, 100+20);


    var mousex = g_mouseX;
    var mousey = g_mouseY;

    var clickbutton = buttonclick(mousex, mousey, g_canvas.width/2-75, 100, 150, 30);

    if(eatKey(KEY_1) || (clickbutton && g_button)){
        util.clearCanvas(ctx);
        ctx.fillStyle = oldStyle;
       	menu(ctx);
    }

    
}





};