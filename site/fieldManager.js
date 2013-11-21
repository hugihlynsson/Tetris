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
        if (g_gamestate === "single_player")
        {
            this._fields = [
                new Field(200, 80, 200, 400, 10, this._control1)
            ];
        }
        if (g_gamestate === "two_player")
        {
            this._fields = [
                new Field(0, 80, 200, 400, 10, this._control1),
                new Field(400, 80, 200, 400, 10, this._control2)
            ];
        }
    },

    update: function (du) {

        if(g_gamestate != "menu" && g_gamestate != "gameover")
        {
            for (var i in this._fields)
            {
                if(!this._fields[i].isgameover())
                {
                    this._fields[i].update(du);
                }
                if(this._fields[i].isgameover() && g_gamestate === "single_player")
                {
                    g_gamestate = "gameover";
                    g_winningscore[0] = "YOUR SCORE";
                    g_winningscore[1] = this._fields[i].getscore();
                }
           }
           if(g_gamestate === "two_player")
           {
                if (this._fields[0].isgameover() && this._fields[1].isgameover())
                {
                    if(this._fields[0].getscore() > this._fields[1].getscore())
                    {
                        g_winningscore[0] = "Player One WON";
                        g_winningscore[1] = this._fields[0].getscore();
                    }
                    else if (this._fields[0].getscore() < this._fields[1].getscore())
                    {
                        g_winningscore[0] = "Player Two WON";
                        g_winningscore[1] = this._fields[1].getscore();
                    }
                    else
                    {
                        g_winningscore[0] = "Draw";
                        g_winningscore[1] = this._fields[0].getscore();
                    }
                    g_gamestate = "gameover";
                }
           }
        }
    },

    render: function (ctx) {
        
        if (g_gamestate === "menu")
        {
            menu(ctx);
        }
        else if (g_gamestate === "gameover")
        {
            gameover(ctx);
        }
        else
        {
             for (var i in this._fields) this._fields[i].render(ctx);
        }
    },

    getNewBlock: function (size, fieldX, fieldY, column) {

        var formType = Math.floor(Math.random()*this._blockNum);
        var form = this._blockForms[formType];
        var color = this._blockFormColors[formType];
        return new Block(size, fieldX, fieldY, column, form, color);
    }

};
