module.exports = function(){

	var $win = $(window),
		$header = $('.splash-header');

	// vertically center header
	function verticalCenter(){
		var winH = $win.height(),
			headerH = $header.height();

		$header.css({
			top: (winH * .4) - (headerH / 2)
		});
	}
	verticalCenter();

};