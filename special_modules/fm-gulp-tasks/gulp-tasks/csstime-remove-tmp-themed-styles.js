'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		task: function (cb) {
			plugins.del([
				path.join(
					plugins.lib.pathHelper.getTemporaryDirectory(config),
					config.lessThemesDir
				)
			], cb);
		}
	};
};