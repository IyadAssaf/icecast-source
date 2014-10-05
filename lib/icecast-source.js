'use strict';

var Source,
	self,
	net = require('net');

module.exports = Source = function (config, cb) {

	self = this;

	config = config || {};

	if(!config.port) {
		throw new Error('icecast-source: No port specified');
	}

	if(!config.mount) {
		throw new Error('icecast-source: No mount specified');
	}

	self.connect(config.port, config.host || 'localhost', function () {

		// handshake with mount
		self.write('SOURCE ' + (config.mount) + ' ICE/1.0\r\n');

		// loop through options

		for(var key in config) {
			if(['port', 'pass', 'mount', 'type'].indexOf(key) === -1) {
				self.write('ice-' + key + ': ' + config[key] + '\r\n');
			}
		}

		self.write('content-type: ' + (config.type || 'audio/mpeg') + '\r\n');
		self.write('Authorization: Basic ' + new Buffer('source:' + (config.password || 'yourPass')).toString('base64') + '\r\n\r\n');
	});

	self.on('data', function (resp) {
		// if auth succeeds
		if(resp.toString() === 'HTTP/1.0 200 OK\r\n\r\n') {

			if (cb) cb();
		} else {
			// callback error
			if (cb) cb('Auth failed!');
			self.end();
		}
	});

	self.on('end', function (status) {
		console.log('client disconnected');
	});
};

Source.prototype = new net.Socket();
