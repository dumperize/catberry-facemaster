'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		task: function () {
			var svgPattern = plugins.lib.pathHelper
					.getAssetsGlobPatterns(
						config,
						path.join(config.svgDir, '**', '*.svg')
					),
				destination = config.isRelease ?
					plugins.lib.pathHelper
						.getTemporaryAssetsDestinationDirectory(config) :
					plugins.lib.pathHelper
						.getAssetsDestinationDirectory(config);

			return gulp.src(svgPattern, {base: process.cwd()})
				.pipe(plugins.if(
					!config.isRelease,
					plugins.changed(plugins.lib.pathHelper
						.getAssetsDestinationDirectory(config))
				))
				.pipe(plugins.if(
					config.isRelease && config.useSvgOptimization,
					plugins.imagemin(config.imageminConfig)
				))
				.pipe(plugins.rename(function (filePath) {
					plugins.lib.pathHelper
						.renamePathToComponentName(config, filePath);
				}))
				.pipe(gulp.dest(destination))
				.pipe(plugins.if(
					config.useSvgRasterization,
					plugins.svg2png()
				))
				.pipe(plugins.if(
					config.isRelease &&
						config.useSvgRasterization && config.useImageOptimization,
					plugins.imagemin(config.imageminConfig)
				))
				.pipe(plugins.if(
					config.useSvgRasterization,
					gulp.dest(destination)
				));
		}
	};
};