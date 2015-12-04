'use strict';

var path = require('path');

module.exports = {

	/**
	 * Compile styles files.
	 * @param {string} stylesName
	 * @param {Object} gulp
	 * @param {Object} plugins
	 * @param {Object} config
	 * @return {Stream}
	 */
	run: function (stylesName, gulp, plugins, config) {
		var sources = [];

		// add sprites
		if (config.useImageSprites) {
			sources.push(path.join(
				plugins.lib.pathHelper.getTemporaryDirectory(config),
				config.spritesFileName + '.less'
			));
		}

		// add main less file
		sources.push(path.join(
			plugins.lib.pathHelper.getTemporaryDirectory(config),
			stylesName + '.less'
		));

		return gulp.src(sources)
			.pipe(plugins.concat(stylesName + '.less'))
			.pipe(plugins.less())
			.pipe(gulp.dest(
				config.isRelease ?
					plugins.lib.pathHelper
						.getTemporaryDestinationDirectory(config) :
					plugins.lib.pathHelper
						.getDestinationDirectory(config)
			));
	}
};