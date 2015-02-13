module.exports = (function(window, document, undefined){

	function Wave(settings, waveCanvas){
		var defaultOpts = {
			color: "#fff",
			particleSpread: 100,
			fK: 0.5,
			dampeningConstant: 1.01,
			elasticityConstant: 1,
			shoveStrength: 3,
			bounceDampening: 1.5,
			bounceDist: waveCanvas.options.stageHeight / 2
		};

		this.options = $.extend(defaultOpts, settings);

		this.waveCanvas = waveCanvas;
		this.springs = [];
		this.particles = [];

		this.extend = 400; // TODO this should be calculated
	}
		
		
	Wave.prototype.generate = function(){
		var total = Math.ceil(this.waveCanvas.options.stageWidth / this.options.particleSpread);
		
		var space = (this.waveCanvas.options.stageWidth + this.extend) / total;
		var xpos = (space * .5) - (this.extend * .5);
		var ypos = this.waveCanvas.options.stageHeight * .5;

		this._bounceTop = ypos - this.options.bounceDist;
		this._bounceBottom = ypos + this.options.bounceDist;
		
		for(var i = 0; i < total; i++){
			var particle = {};
			
			particle.x = particle.xpos = xpos;
			particle.y = particle.ypos = particle.origY = ypos;
			particle.ay = 0;
			particle.vy = 0;
			particle.mass = 1;

			this.particles.push(particle);
			
			xpos += space;
		}
		
		for(var u = 0; u < this.particles.length-1; u++){
			this.springs.push({
				iLengthY: (this.particles[u+1].y - this.particles[u].y)
			});
		}
	};

	Wave.prototype.randomShove = function(){

		// pick a particle
		var i = Math.floor(Math.random() * this.particles.length);

		// push on it
		this.particles[i].vy = this.options.bounceDist * this.options.shoveStrength;

	}

	Wave.prototype.mouseMove = function(x, y, lastX, lastY){
		var particle = null;
		var smallestDist = Infinity;
		var target = null;

		// loop through particles to find the affected particle
		// TODO: this can be inferred mathematically
		var j = this.particles.length;
		while(--j > -1){
			var dx = x - this.particles[j].x,
				dy = y - this.particles[j].y,
				dist = Math.sqrt(dx * dx + dy * dy);
			
			if(dist < smallestDist){
				particle = this.particles[j];
				smallestDist = dist;
				target = j;
			}
		}

		if(particle && y > particle.y){
			var speed = y - lastY;

			// this.particles[target - 2].vy = speed / 3 * this.elasticityConstant;
			// this.particles[target - 1].vy = speed / 2 * this.elasticityConstant;
			this.particles[target].vy = speed / this.elasticityConstant;
			// this.particles[target + 1].vy = speed / 2 * this.elasticityConstant;
			// this.particles[target + 2].vy = speed / 3 * this.elasticityConstant;
		}
	};


	Wave.prototype.moveParticles = function(fpsAdjust){

		for(var u = this.particles.length-1; u >= 0; --u){
			var fExtensionY = 0;
			var fForceY = 0;
		
			if(u > 0){
				fExtensionY = this.particles[u-1].y - this.particles[u].y - this.springs[u-1].iLengthY;
				fForceY += -this.options.fK * fExtensionY;
			}
			
			if(u < this.particles.length-1){
				fExtensionY = this.particles[u].y - this.particles[u+1].y - this.springs[u].iLengthY;
				fForceY += this.options.fK * fExtensionY;
			}
			
			fExtensionY = this.particles[u].y - this.particles[u].origY;
			fForceY += this.options.fK/15 * fExtensionY;
			
			this.particles[u].ay = -fForceY / this.particles[u].mass;
			this.particles[u].vy	+= this.particles[u].ay;
			this.particles[u].ypos += this.particles[u].vy * fpsAdjust;

			// maybe bounce
			if(this.particles[u].ypos < this._bounceTop){

				// flip velocity dir
				this.particles[u].vy *= -1;

				this.particles[u].ypos = this._bounceTop + Math.abs(this._bounceTop - this.particles[u].ypos);
				this.particles[u].ya /= this.options.bounceDampening;

			}else if(this.particles[u].ypos > this._bounceBottom){

				// flip velocity dir
				this.particles[u].vy *= -1;

				this.particles[u].ypos = this._bounceBottom - (this.particles[u].ypos - this._bounceBottom);
				this.particles[u].ya /= this.options.bounceDampening;
			}

			this.particles[u].vy /= this.options.dampeningConstant;
		}
	};

	Wave.prototype.render = function(fpsAdjust){

		var context = this.waveCanvas.canvasContext;
		
		context.fillStyle = this.options.color;
		context.beginPath();
		
		for(u = 0; u < this.particles.length; u++) {
			if(u === 0) {
				context.moveTo(
					this.particles[u].xpos + (this.particles[u+1].xpos - this.particles[u].xpos)/2,
					this.particles[u].ypos + (this.particles[u+1].ypos - this.particles[u].ypos)/2
				);
			}	else if(u < this.particles.length-1)	{
				context.lineTo(this.particles[u].xpos, this.particles[u].ypos);
			}

			this.particles[u].x = this.particles[u].xpos;
			this.particles[u].y = this.particles[u].ypos;
		}
		
		context.lineTo(this.waveCanvas.options.stageWidth+50, this.waveCanvas.options.stageHeight+50);
		context.lineTo(-50, this.waveCanvas.options.stageHeight+50);
		context.lineTo(-50, this.waveCanvas.options.stageHeight/2);
		context.closePath();
		context.fill();
	};

	return Wave;
})(window, document);