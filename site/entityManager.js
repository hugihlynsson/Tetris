// ==============
// ENTITY MANAGER
// ==============
//
// A module which handles arbitrary entity-management for Tetris

var entityManager = {
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
            [1, 1]]
    },

    _blockNum : 6,

    _blockFormColors : {
        0: '#ff69b4',
        1: '#e9967a',
        2: '#eedd82',
        3: '#66cdaa',
        4: '#00bfff',
        5: '#ffdead',
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
        this._fields = [
            new Field(0, 80, 200, 400, 10, this._control1),
            /*new Field(210, 80, 200, 400, 10, this._control2)*/
        ];
    },

    update: function (du) {
        for (var i in this._fields) this._fields[i].update(du);
    },

    render: function (ctx) {
        for (var i in this._fields) this._fields[i].render(ctx);
    },

    getNewBlock: function (size, fieldX, fieldY, column) {
        var formType = Math.floor(Math.random()*this._blockNum);
        var form = this._blockForms[formType];
        var color = this._blockFormColors[formType];
        return new Block(size, fieldX, fieldY, column, form, color);
    }
};
