'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		task: function () {
			return gulp.src(
					plugins.lib.pathHelper.getStaticFilesGlobPattern(
						config,
						'**'
					)
				)
				.pipe(plugins.if(
					!config.isRelease,
					plugins.changed(plugins.lib.pathHelper
						.getDestinationDirectory(config))
				))
				.pipe(gulp.dest(
					config.isRelease ?
						plugins.lib.pathHelper
							.getTemporaryDestinationDirectory(config) :
						plugins.lib.pathHelper
							.getDestinationDirectory(config)
				));
		}
	};
};