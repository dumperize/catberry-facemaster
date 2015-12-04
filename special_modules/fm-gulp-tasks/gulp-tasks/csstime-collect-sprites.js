'use strict';

var path = require('path'),
	defaultSpritesmithConfig = require('../configs/spritesmith.json');

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: ['csstime-remove-tmp-sprites'],
		task: function () {
			var spriteImagesPattern = plugins.lib.pathHelper
					.getAssetsGlobPatterns(
						config,
						path.join(config.spritesDir, '**', '*.png')
					);

			var cssTemplate =
				(config.spritesmithConfig.cssTemplatePath ===
					defaultSpritesmithConfig.cssTemplatePath) ?
					path.join(config.packagePath,
						defaultSpritesmithConfig.cssTemplatePath) :
					config.spritesmithConfig.cssTemplatePath;

			var	spriteData =
				gulp.src(spriteImagesPattern)
				.pipe(plugins.spritesmith({
					imgName: config.spritesFileName + '.png',
					cssName: config.spritesFileName + '.less',
					algorithm: config.spritesmithConfig.algorithm,
					cssTemplate: cssTemplate,
					padding: config.spritesmithConfig.padding
				}));

			spriteData.img
				.pipe(plugins.if(
					config.isRelease && config.useImageOptimization,
					plugins.imagemin(config.imageminConfig)
				))
				.pipe(gulp.dest(
					config.isRelease ?
						plugins.lib.pathHelper
							.getTemporaryAssetsDestinationDirectory(config) :
						plugins.lib.pathHelper
							.getAssetsDestinationDirectory(config)
				));

			return spriteData.css.pipe(gulp.dest(
				plugins.lib.pathHelper.getTemporaryDirectory(config)
			));
		}
	};
};