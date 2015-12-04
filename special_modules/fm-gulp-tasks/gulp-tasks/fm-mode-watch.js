'use strict';

var path = require('path');
module.exports = function (gulp, plugins, config) {
	return {
		dependencies: [
			'fm-css-compile-scss'
		]
	}
};
//
//module.exports = function (gulp, plugins, config) {
//	return {
//		dependencies: [
//			'csstime-process-static',
//			'csstime-process-assets'
//		],
//		task: function () {
//			gulp.watch(
//				plugins.lib.pathHelper.getAssetsGlobPatterns(
//					config,
//					path.join('**', '*')
//				),
//				{
//					interval: config.watchInterval
//				},
//				['csstime-process-assets']
//			);
//
//			gulp.watch(
//				plugins.lib.pathHelper.getStaticFilesGlobPattern(
//					config,
//					path.join('**', '*')
//				),
//				{
//					interval: config.watchInterval
//				},
//				['csstime-process-static']
//			);
//
//			var logger = require('../lib/logger')(plugins, config);
//			logger.write('watch mode', 'blue');
//			logger.notify('Watch mode is on');
//		}
//	};
//};