module.exports = function(){
	var selfConfig = require('../config/self-config'),
		WaveCanvas = require('./WaveCanvas');

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
		lastScrollTop,
		footerScrollH;

	// set up the footer
	function setupFooter(){
		var winH = $win.height(),
			docH = $doc.height();

		if(docH < winH){
			// set body to 100% so footer abs work
			$body.height(winH + 100);
			docH = winH + 100;
		}else{
			$body.height(docH + 100);
		}

		footerScrollH = docH - winH;
	}
	setupFooter();

	// after scrolling past footerScrollH, add class to show footer
	var footerVisible = false,
		pauseFooterScroll = false;

	function showHideFooter(e){
		lastScrollTop = scrollTop;
		scrollTop = $win.scrollTop();

		var scrollingDown = 0 < scrollTop - lastScrollTop;

		if(!scrollingDown && footerVisible && scrollTop < footerScrollH + selfConfig.footerHideBuffer){

			// hide footer
			
			$footer.removeClass('show');
			$win.off('scroll.footer');

			setTimeout(function(){

				footerVisible = false;
				$win.on('scroll.footer', showHideFooter);

			}, selfConfig.footerAnimSpeed);
			
		}else if(scrollingDown && !footerVisible && scrollTop > footerScrollH){

			// show footer

			$footer.addClass('show');
			$win.off('scroll.footer');

			setTimeout(function(){

				footerVisible = true;
				$win.on('scroll.footer', showHideFooter);

			}, selfConfig.footerAnimSpeed);

		}

	};
	$win.on('scroll.footer', showHideFooter);

	// toglle footer visibility when clicking the wave
	$canvas.click(function(){
		$footer.toggleClass('show');
		footerVisible = !footerVisible;
	});

console.log('footer');
	return {
		showHideFooter: showHideFooter
	}

};