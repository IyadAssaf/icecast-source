module.exports = function (config, cb) {
	return new (require('./lib/icecast-source'))(config, cb);
};
