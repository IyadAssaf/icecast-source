module.exports = function () {
	'use strict';

	var net = require('net'),
		client = new net.Socket();

	// connect to icecast server
	client.connect(9000, 'localhost', function () {

		// handshake with auth
		client.write('SOURCE /mp3test ICE/1.0\r\n');
		client.write('content-type: audio/mpeg\r\n');
		client.write('Authorization: Basic c291cmNlOnlvdXJQYXNz\r\n\r\n');
	});

	client.on('data', function (resp) {

		// if auth succeeds
		if(resp.toString() === 'HTTP/1.0 200 OK\r\n\r\n') {
			console.log('HTTP/1.0 200 OK');
		} else {
			client.end();
		}
	});

	client.on('end', function (status) {
		console.log('client disconnected');
	});
};
