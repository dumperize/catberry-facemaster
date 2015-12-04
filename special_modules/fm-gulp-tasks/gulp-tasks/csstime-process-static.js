'use strict';

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: ['csstime-copy-static'],
		task: function () {
			var logger = require('../lib/logger')(plugins, config);
			logger.write('static were rebuilt');
			if (!config.isRelease) {
				logger.notify('Static files were rebuilt');
			}
		}
	};
};