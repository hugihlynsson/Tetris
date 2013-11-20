// ============
// FIELDMANAGER
// ============
//
// A module which handles arbitrary field management for Tetris

var fieldManager = {
    _blockForms : {

        0: [[1, 1, 1, 1]],

        1: [[0, 1, 0],
            [1, 1, 1]],

        2: [[1, 1],
            [1, 1]],

        3: [[0, 1, 1],
            [1, 1, 0]],

        4: [[1, 1, 0],
            [0, 1, 1]],

        5: [[0, 1],
            [0, 1],
            [1, 1]],

        6: [[1, 0],
            [1, 0],
            [1, 1]], 
/*
    This is a terror Tetris-piece
        7: [[0, 1, 0, 1],
            [1, 0, 1, 0],
            [0, 1, 0, 1],
            [1, 0, 1, 0]]*/
    },

    _blockNum : 7,

    _blockFormColors : {
        0: g_color.pink,
        1: g_color.red,
        2: g_color.yellow,
        3: g_color.green,
        4: g_color.blue,
        5: g_color.sand,
        6: '#cdc9c9'
    },

    _control1 : {
        left: keyCode('A'), 
        right: keyCode('D'), 
        rotate: keyCode('W'), 
        fast: keyCode('S')
    },
    _control2 : {
        left: keyCode('J'), 
        right: keyCode('L'), 
        rotate: keyCode('I'), 
        fast: keyCode('K')
    },

    _fields : null,

    init : function () {
        if (g_gamestate === 1) 
        {
            this._fields = [
                new Field(200, 80, 200, 400, 10, this._control1)
            ];
        }
        if (g_gamestate === 2) 
        {
            this._fields = [
                new Field(0, 80, 200, 400, 10, this._control1),
                new Field(400, 80, 200, 400, 10, this._control2)
            ];
        }
    },

    update: function (du) {
        if(g_gamestate === 1){
            this._fields[0].update(du); 
            if(this._fields[0].isgameover()){
                g_winningscore[0] = "Your Score";
                g_winningscore[1] = this._fields[0].getscore();
                g_gamestate = 5;
            }  
        }
        else if(g_gamestate === 2){
            for (var i in this._fields) this._fields[i].update(du); 
            if(this._fields[0].isgameover()){
                g_winningscore[0] = "DRAW";
                g_winningscore[1] = this._fields[0].getscore();
                g_gamestate = 4;
            }
            else if(this._fields[1].isgameover()){
                g_winningscore[0] = "DRAW";
                g_winningscore[1] = this._fields[1].getscore();
                g_gamestate = 3;
            }   
        }
        else if(g_gamestate === 3){
            this._fields[0].update(du);
            if(this._fields[0].isgameover()){
                if(this._fields[0].getscore() > g_winningscore[1]){
                    g_winningscore[0] = "Player One WON";
                    g_winningscore[1] = this._fields[0].getscore();
                }
                g_gamestate = 5;
            }    
        }
        else if(g_gamestate === 4){
            this._fields[1].update(du);
            if(this._fields[1].isgameover()){
                if(this._fields[1].getscore() > g_winningscore[1]){
                    g_winningscore[0] = "Player Two WON";
                    g_winningscore[1] = this._fields[1].getscore();
                }
                g_gamestate = 5;
            } 
        }
    },

    render: function (ctx) {
        if (g_gamestate === 0){
            menu(ctx);
        }
        else if(g_gamestate === 1){
            this._fields[0].render(ctx);   
        }
        else if(g_gamestate === 2){
             for (var i in this._fields) this._fields[i].render(ctx);  
        }
        else if(g_gamestate === 3){
            this._fields[0].render(ctx);  
            ctx.globalAlpha = 0.2;
            this._fields[1].render(ctx);  
            ctx.globalAlpha = 1; 
        }
        else if(g_gamestate === 4){
            this._fields[1].render(ctx);
            ctx.globalAlpha = 0.2;
            this._fields[0].render(ctx);  
            ctx.globalAlpha = 1;
        }
        else if (g_gamestate === 5){
            gameover(ctx);
        }
    },

    getNewBlock: function (size, fieldX, fieldY, column) {
        var formType = Math.floor(Math.random()*this._blockNum);
        var form = this._blockForms[formType];
        var color = this._blockFormColors[formType];
        return new Block(size, fieldX, fieldY, column, form, color);
    }

};
