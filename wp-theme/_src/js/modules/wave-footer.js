module.exports = function(){
	var WaveCanvas = require('./WaveCanvas');

	var wcOpts = {
		stageHeight: 100	
	};

	window.footerWave = new WaveCanvas([
		{
			color: '#53565a'
		},
		{
			color: '#242629'
		}
	], wcOpts);


	var $win = $(window),
		$body = $('body'),
		$canvas = $('.wave-canvas'),
		$footer = $('.site-footer');

	function positionFooter(){
		var winH = $win.height(),
			footerH = $footer.height();

		// position canvas
		$canvas.css({
			bottom: footerH 
		});

		// set body to 100% so footer abs work
		$body.height(winH);
	}
	positionFooter();

};