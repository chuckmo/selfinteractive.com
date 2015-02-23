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
		$doc = $(document),
		$body = $('body'),
		$canvas = $('.wave-canvas'),
		$footer = $('.site-footer'),

		scrollTop,
		footerScrollH;

	// set up the footer
	function setupFooter(){
		var winH = $win.height(),
			docH = $doc.height();

		if(docH < winH){
			// set body to 100% so footer abs work
			$body.height(winH + 400);
			docH = winH + 400;
		}else{
			$body.height(docH + 400);
		}

		footerScrollH = docH - winH;
	}
	setupFooter();

	// after scrolling past footerScrollH, add class to show footer
	var footerVisible = false;
	function showHideFooter(e){
		scrollTop = $win.scrollTop();

		if(footerVisible && scrollTop < footerScrollH + 200){
			$footer.removeClass('show');
			footerVisible = false;
		}else if(!footerVisible && scrollTop > footerScrollH){
			$footer.addClass('show');
			footerVisible = true;
		}

	};
	$win.on('scroll', showHideFooter);

	$canvas.click(function(){
		$footer.toggleClass('show');
		footerVisible = !footerVisible;
	});

};