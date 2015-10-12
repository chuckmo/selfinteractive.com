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

	// video goodies
	var $video = $('video'),
		$videoSrc = $video.find('source'),
		videoSources = [
			'https://scontent.cdninstagram.com/hphotos-xaf1/t50.2886-16/11679595_446121665565112_826993811_n.mp4',
			'https://scontent.cdninstagram.com/hphotos-xfa1/t50.2886-16/11673071_379475492250158_1975011783_n.mp4',
			'https://scontent.cdninstagram.com/hphotos-xaf1/t50.2886-16/11675368_793594220755444_500955429_n.mp4',
			'https://scontent.cdninstagram.com/hphotos-xaf1/t50.2886-16/11373084_895652970490869_205551364_n.mp4',
			'https://scontent.cdninstagram.com/hphotos-xaf1/t50.2886-16/11336740_791601014281083_1139788957_n.mp4',
			'https://scontent.cdninstagram.com/hphotos-xaf1/t50.2886-16/11250849_1447679142211608_1839698999_n.mp4',
			'https://scontent.cdninstagram.com/hphotos-xfa1/t50.2886-16/11214422_1610200179220432_2062958988_n.mp4',
			'https://scontent.cdninstagram.com/hphotos-xtf1/t50.2886-16/11099934_1618123458402108_882747486_n.mp4',
			'https://scontent.cdninstagram.com/hphotos-xpa1/t50.2886-16/11080166_1584122515200011_598251143_n.mp4',
			'https://scontent.cdninstagram.com/hphotos-xpf1/t50.2886-16/11019589_1555832421368292_1326463975_n.mp4',
			'https://scontent.cdninstagram.com/hphotos-xpf1/t50.2886-16/11014526_1626068410948112_1659381473_n.mp4'
		];

	function getRandomVid(videos){
		return videos[Math.floor(Math.random() * videos.length)];
	}

	$videoSrc.attr('src', getRandomVid(videoSources));

	setTimeout(function(){
		$video.addClass('visible');
		$video.load();
	}, 1500);


};