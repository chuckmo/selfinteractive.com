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

};