// ==============
// ENTITY MANAGER
// ==============
//
// A module which handles arbitrary entity-management for Tetris

var EntityManager = function () 
{
    var _fields = [];

    // Private variables and methods:
    var _createPlayfield = function () {
        _fields[_fields.length] = new Field(10, 20);
    };

    var _forEachField = function(fn) {
        for (var i in _fields) 
        {
            fn.call(_fields[i]);
        }
    };

    // Public methods:
    return {

        setActiveBlock : function (block) {
            //this._categories[0].setActiveBlock(block);
        },

        update: function(du) {
            for (var i in _fields) 
            {
                _fields[i].update(du);
            }

        },

        render: function(ctx) {
            for (var i in _fields) 
            {
                _fields[i].render();
            }
        }
    }
};
