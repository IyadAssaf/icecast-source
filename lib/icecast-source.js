'use strict';

var Source,
	self,
	net = require('net');

module.exports = Source = function (config) {

	self = this;

	self.connect(config.port, config.host || 'localhost', function () {

			// handshake with auth
			self.client.write('SOURCE ' + config.mount || '/test' + ' ICE/1.0\r\n');
			self.client.write('content-type: audio/mpeg\r\n');
			self.client.write('Authorization: Basic c291cmNlOnlvdXJQYXNz\r\n\r\n');
		});

		self.on('data', function (resp) {

			// if auth succeeds
			if(resp.toString() === 'HTTP/1.0 200 OK\r\n\r\n') {
				console.log('HTTP/1.0 200 OK');
			} else {
				client.end();
			}
		});

		self.on('end', function (status) {
			console.log('client disconnected');
		});
	};
};

Source.prototype = new net.Socket();
