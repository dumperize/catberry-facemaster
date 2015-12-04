'use strict';

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: [
			'csstime-handle-css',
			'csstime-collect-images',
			'csstime-collect-fonts',
			'csstime-collect-svg',
			'csstime-combine-svg',
			'csstime-collect-other'
		],
		task: function (cb) {
			if (!config.themedStylesFileNames.length) {
				done(cb);
				return;
			}

			plugins.runSequence('csstime-handle-themed-css', function () {
				done(cb);
			});
		}
	};

	function done (cb) {
		var logger = require('../lib/logger')(plugins, config);
		logger.write('assets were rebuilt');
		if (!config.isRelease) {
			logger.notify('Assets were rebuilt');
		}
		cb();
	}
};