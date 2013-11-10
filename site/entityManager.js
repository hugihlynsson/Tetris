// ==============
// ENTITY MANAGER
// ==============
//
// A module which handles arbitrary entity-management for Tetris

var EntityManager = function () 
{
    // Private variables and methods:
    var _fields = [
        new Field(0, 0, 200, 400, 10)
    ];

    // TODO: Move these variables to Field:
    var _blockClock = 15;
    var _clock = 0;
    var _KEY_FAST = keyCode('S');

    // Public methods:
    return {

        setActiveBlock : function (block) {
            //this._categories[0].setActiveBlock(block);
        },

        update: function(du) {

            // TODO: Move most of this stuff to Field:
            var speed = 1;            
            if(eatKey(_KEY_FAST)) speed = 10;

            _clock += 1 * speed * du;

            if(_clock >= _blockClock)
            {
                for (var i in _fields) _fields[i].tick();
            }
            
            _clock = _clock % _blockClock;

            for (var i in _fields) _fields[i].update(du);

        },

        render: function(ctx) {
            for (var i in _fields) _fields[i].render(ctx);
        }
    }
};
