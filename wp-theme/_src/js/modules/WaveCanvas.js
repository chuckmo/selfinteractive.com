module.exports = (function(window, document, undefined){
	var Wave = require('./Wave');

	var WaveCanvas = function(waves, options){

		var defaultOpts = {
			stageSelector: 'canvas',
			stageWidth: $(document).width(),
			stageHeight: $(document).height(),
			waves: []
		};
		this.options = $.extend(defaultOpts, options);

		this.stage = $(this.options.stageSelector)[0];

		// where we store multiplier for variable framerate
		this.fpsAdjust = 1000;

		// Mouse tracking
		this.mouseStoreX = 0;
		this.mouseStoreY = 0;
		this.mouseX = 0;
		this.mouseY = 0;

		// is IE?
		this.IE = document.all ? true : false;

		// Where we'll store our waves
		this.waves = [];
		var that = this;
		waves.map(function(waveOpts){
			that.waves.push(new Wave(waveOpts, that));
		});

		// make it go!
		this.init();

	};

	WaveCanvas.prototype.init = function(){

		// if canvas is supported, let's do this!
		if(this.stage.getContext){

			// setup stage dims
			this.setStageDimensions(this.options.stageWidth, this.options.stageHeight);

			// store the canvas 2d context
			this.canvasContext = this.stage.getContext('2d');

			// generate each wave
			this.waves.map(function(wave){
				// setup the particles
				wave.generate();
				wave.randomShove();
			});

			// setup animation loops
			var lastFrameTime = new Date().getTime();
			var wc = this;
			(function animloop(){
				var newTime = new Date().getTime();

				// calculate time since last frame and store as fraction of a second
				var timeDelta = newTime - lastFrameTime;
				if(timeDelta < 1000)
					wc.fpsAdjust = timeDelta/1000;

				lastFrameTime = newTime;

				// clear canvas
				wc.canvasContext.clearRect(0, 0, wc.options.stageWidth, wc.options.stageHeight);

				// update and render each wave
				wc.waves.map(function(wave){
					wave.moveParticles(wc.fpsAdjust);
				  wave.render(wc.fpsAdjust);
				});

			  window.requestAnimationFrame(animloop);
			})();

			// listen for mouse movement
			// $(document).on('mousemove', { wc: wc }, wc.getMouseXY);
		}
	};

	WaveCanvas.prototype.setStageDimensions = function(width, height){
		this.options.stageWidth = width;
		this.options.stageHeight = height;
		
		$(this.stage).width(width);
		$(this.stage).height(height);
		this.stage.width = width;
		this.stage.height = height;
	};

	WaveCanvas.prototype.getMouseXY = function(e){
		var wc = e.data.wc;

		// save the mouse coords
		if(wc.IE) {
			wc.mouseX = event.clientX + document.body.scrollLeft;
			wc.mouseY = event.clientY + document.body.scrollTop;
		}	else {
			wc.mouseX = e.pageX;
			wc.mouseY = e.pageY;
		}  
		
		// make sure they're positive
		if(wc.mouseX < 0)
			wc.mouseX = 0;
		if(wc.mouseY < 0)
			wc.mouseY = 0;
		
		// pass the event on to each wave
		wc.waves.map(function(wave){
			wave.mouseMove(wc.mouseX, wc.mouseY, wc.mouseStoreX, wc.mouseStoreY);
		});

		wc.mouseStoreY = wc.mouseY;
		wc.mouseStoreX = wc.mouseX;
		
		return true;
	};

	return WaveCanvas;
			
})(window, document);