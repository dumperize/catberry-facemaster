'use strict';

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: [
			'csstime-process-static',
			'csstime-process-assets'
		],
		task: function () {
			var logger = require('../lib/logger')(plugins, config);
			logger.write('debug mode', 'yellow');
		}
	};
};