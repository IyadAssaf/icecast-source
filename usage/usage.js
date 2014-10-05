'use strict';

var source = require('../index')({
	port: 9000,
	pass: 'yourPass',
	mount: '/superCoolStuff',
	type: 'audio/mpeg',
	name: 'helllllo'


}, function (err) {

	if(err) {
		console.log(err);
		return;
	}
	
	// Time to write some data
	while(true) {
		source.write('some audio data');
	}
});
