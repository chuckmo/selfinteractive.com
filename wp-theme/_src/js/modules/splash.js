module.exports = function(){

	var $win = $(window),
		$header = $('.splash-header');

	function positionHeader(){
		var winH = $win.height(),
			winW = $win.width(),
			headerH = $header.height(),

			headerCSS;

		//mobile?
		if(winW < 600){
			// align to bottom
			headerCSS = {
				paddingTop: winH - 100 - headerH
			};
		}else{
			// align middle
			headerCSS = {
				top: (winH * .4) - (headerH / 2)
			};
		}

		$header.css(headerCSS);

	}
	positionHeader();

	$win.on('resize', positionHeader);

};