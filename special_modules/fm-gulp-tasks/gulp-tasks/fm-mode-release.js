'use strict';

module.exports = function (gulp, plugins, config) {
	return {
		task: function (cb) {
			config.isRelease = true;
			plugins.runSequence(
				'csstime-publish-tmp',
				'csstime-remove-tmp',
				function () {
					var logger = require('../lib/logger')(plugins, config);
					logger.write('release mode', 'green');
					cb();
				}
			);
		}
	};
};