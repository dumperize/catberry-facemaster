'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		task: function () {
			var otherPattern = plugins.lib.pathHelper
					.getAssetsGlobPatterns(
						config,
						path.join(config.otherDir, '**')
					);

			return gulp.src(otherPattern, {base: process.cwd()})
				.pipe(plugins.if(
					!config.isRelease,
					plugins.changed(plugins.lib.pathHelper
						.getAssetsDestinationDirectory(config))
				))
				.pipe(plugins.rename(function (filePath) {
					plugins.lib.pathHelper
						.renamePathToComponentName(config, filePath);
				}))
				.pipe(gulp.dest(
					config.isRelease ?
						plugins.lib.pathHelper
							.getTemporaryAssetsDestinationDirectory(config) :
						plugins.lib.pathHelper
							.getAssetsDestinationDirectory(config)
				));
		}
	};
};