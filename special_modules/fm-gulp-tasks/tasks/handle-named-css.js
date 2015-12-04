'use strict';

var path = require('path'),
	time = require('../lib/time');

var NODE_MODULES = 'node_modules',
	NORMALIZE_CSS = 'normalize.css';

module.exports = {

	/**
	 * Handles styles files.
	 * @param {string} stylesName
	 * @param {Object} gulp
	 * @param {Object} plugins
	 * @param {Object} config
	 * @return {Stream}
	 */
	run: function (stylesName, gulp, plugins, config) {
		var sources = [];

		// add normalize.css
		if (config.useNormalizeCss && stylesName === config.stylesFileName) {
			sources.push(path.join(
				config.packagePath,
				NODE_MODULES,
				NORMALIZE_CSS,
				NORMALIZE_CSS
			));
		}

		// add themed.css compiled from less
		sources.push(path.join(
			config.isRelease ?
				plugins.lib.pathHelper
					.getTemporaryDestinationDirectory(config) :
				plugins.lib.pathHelper
					.getDestinationDirectory(config),
			stylesName + '.css'
		));

		// collect themed.css from all components
		plugins.lib.pathHelper.getAssetsGlobPatterns(
			config,
			path.join(config.cssDir, stylesName + '.css')
		)
			.forEach(function (pattern) {
				sources.push(pattern);
			});

		var processors = [];
		if (config.postcssConfig.filters) {
			processors.push(plugins.postcssProcessors
				.filters(config.postcssConfig.filters));
		}
		if (config.postcssConfig.opacity) {
			processors.push(plugins.postcssProcessors.opacity);
		}
		if (config.postcssConfig.autoprefixer) {
			processors.push(plugins.postcssProcessors
				.autoprefixer(config.postcssConfig.autoprefixer));
		}

		return gulp.src(sources)
			.pipe(plugins.concat(stylesName + '.css'))
			.pipe(plugins.if(
				config.usePostCSS,
				plugins.postcss(processors)
			))
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