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

		scrollTop = 0,
		lastScrollTop = 0,
		footerScrollH;


	var waveSetup = false;
	function setupWaveEntrance(){

		if(waveSetup)
			return;

		waveSetup = true;

		setTimeout(function(){
			
			$footer.addClass('cower entrance');

			setTimeout(function(){
				$footer.removeClass('entrance');
			}, selfConfig.waveEntranceSpeed);

		}, selfConfig.waveEntranceDelay);

	}

	// after scrolling past footerScrollH, add class to show footer
	var footerVisible = false,
		pauseFooterScroll = false;

	function maybeToggleFooterOnScroll(e){
		lastScrollTop = scrollTop;
		scrollTop = $win.scrollTop();

		var scrollingDown = 0 < scrollTop - lastScrollTop;

		if(
			!scrollingDown && footerVisible && scrollTop < footerScrollH + selfConfig.footerHideBuffer
			|| scrollingDown && !footerVisible && scrollTop > footerScrollH
		){
			toggleFooter();
		}
			

	}


	// toggle footer visibility
	function toggleFooter(e){
		if(e)
			e.preventDefault();

		$footer.toggleClass('show');
		footerVisible = !footerVisible;

		return false;
	}


	// set up the footer
	var footerSetup = false;
	function setupFooter(){
		var winH = $win.height(),
			winW = $win.width(),
			docH = $doc.height();

		if(winW < selfConfig.dynamicFooterBreakpoint){
			$body.height('auto');
			return;
		}

		if(docH < winH){
			// set body to 100% so footer abs work
			$body.height(winH + 100);
			docH = winH + 100;
		}else{
			$body.height(docH + 100);
		}

		footerScrollH = docH - winH;

		//////////////////////////////////////
		// only run the following stuff once
		// ///////////////////////////////////
		if(footerSetup)
			return;

		footerSetup = true;

		// run maybeToggleFooterOnScroll after a short delay
		setTimeout(function(){

			maybeToggleFooterOnScroll();
			// ...and now on scroll
			$win.on('scroll.footer', maybeToggleFooterOnScroll);

		}, selfConfig.waveEntranceDelay);

		// turn on click listener for footer togglers
		$('[data-toggle-footer]').on('click.toggle-footer', toggleFooter);

		// don't toggle footer when clicking a link in footer
		$footer.find('a').on('click', function(e){
			e.stopImmediatePropagation();
		});

		setupWaveEntrance();
	};

	$win.on('resize', setupFooter);
	setupFooter();

	return {
		showHideFooter: maybeToggleFooterOnScroll
	};

};