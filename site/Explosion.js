function Explosion(start_x, start_y){

	var _particles = [];
	// A random color for this particular explosion.
	// We like pastel-y colours, as everyone should.
	var _colour = util.randomColor(105, 255);

	var _alive = true;
	var _startVelX = 3;
	var _startVelY = 3;
	var _maxLife = 100;
	var _gravity = 0.12;
	var _particleCount = 20;

	for(var i = 0; i < _particleCount; i++)
	{
		var life = Math.floor(_maxLife - 20 + Math.random() * 20);
		var direction = Math.random() * 2 * Math.PI;
		var velX = Math.sin(direction) * _startVelX * Math.random();
		var velY = -Math.cos(direction) * _startVelY * Math.random();

		_particles.push({
			x : start_x,
			y : start_y,
			r : 2,
			velX : velX,
			velY : velY,
			dir : direction,
			life : life
		});
	}

	var update = function (du) {
		var p = _particles;

		for(var i in p) {

			if(false)
			{
				p[i].velY += _gravity * du;
			}

			p[i].x += p[i].velX * du;
			p[i].y += p[i].velY * du;

			p[i].life--;

			// Kill particle if left screen
			// or if dead
			if(p[i].life <= 0 || p[i].y > g_canvas.height)
			{
				p.splice(i, 1);

				// Fix skip-error
				i--;
			}
		}

		if(p.length === 0){
			_alive = false;
			return false;
		}

		_particles = p;
		return true;
	};


	var render = function (ctx) {
		var oldStyle = ctx.fillStyle;
		var p = _particles;

		for(var i in p)
		{
			// Calculate alpha for particle
			var alpha = p[i].life/_maxLife;

			ctx.fillStyle = "rgba(" + _colour + ", " + alpha + ")";
			util.fillCircle(ctx, p[i].x, p[i].y, p[i].r);
		}

		ctx.fillStyle = oldStyle;
	};

	return {
		update: update,
		render: render
	}
}