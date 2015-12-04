'use strict';

var path = require('path'),
	time = require('../lib/time');

module.exports = {

	/**
	 * Minify named css.
	 * @param {string} stylesName
	 * @param {Object} gulp
	 * @param {Object} plugins
	 * @param {Object} config
	 * @return {Stream}
	 */
	run: function (stylesName, gulp, plugins, config) {
		return gulp.src(
			path.join(
				config.isRelease ?
					plugins.lib.pathHelper
						.getTemporaryDestinationDirectory(config) :
					plugins.lib.pathHelper
						.getDestinationDirectory(config),
				stylesName + '.css'
			)
		)
			.pipe(plugins.concat(stylesName + '.css'))
			.pipe(plugins.csso(!config.useCssStructureMinimization))
			.pipe(plugins.if(
				config.banner && (typeof config.banner === 'string'),
				plugins.header(config.banner
					.replace('<%now%>', time.captureNow()))
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