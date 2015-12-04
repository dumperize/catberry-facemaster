'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		task: function (cb) {
			if (!config.useSvgSymbols) {
				cb();
				return;
			}

			var svgPattern = plugins.lib.pathHelper
					.getAssetsGlobPatterns(
						config,
						path.join(config.svgSymbolsDir, '**', '*.svg')
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
				.pipe(plugins.rename({prefix: config.svgSymbolsPrefix}))
				.pipe(plugins.svgstore(config.svstoreConfig))
				.pipe(plugins.rename(config.svgSymbolsFileName + '.svg'))
				.pipe(gulp.dest(destination));
		}
	};
};