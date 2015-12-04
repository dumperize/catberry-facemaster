'use strict';

var path = require('path'),
	util = require('util'),
	fs = require('fs');

var IMPORT_FORMAT = '/*\n * Styles of component "%s"\n */\n@import "%s";',
	BASE_VARIABLES = '@CDN: "%s";',
	SPRITES_VARIABLES = '@SPRITES_IMAGE: "%s";';

module.exports = {

	/**
	 * Concat styles files.
	 * @param {string} stylesName
	 * @param {Object} gulp
	 * @param {Object} plugins
	 * @param {Object} config
	 * @return {Stream}
	 */
	run: function (stylesName, gulp, plugins, config) {
		var componentsDirectories = plugins.lib.pathHelper
				.getAssetsDirectories(config),
			imports = [];

		// variables
		imports.push(util.format(BASE_VARIABLES, config.cdnPath));

		// sprites
		if (config.useImageSprites) {
			imports.push(util.format(
				SPRITES_VARIABLES,
				config.spritesFileName + '.png'
			));
		}

		// less
		componentsDirectories.forEach(function (component) {
			var importingFile = path.join(
				component,
				config.lessDir,
				stylesName + '.less'
			);
			if (!fs.existsSync(importingFile)) {
				return;
			}
			imports.push(util.format(IMPORT_FORMAT, component, importingFile));
		});

		// create file
		return plugins.file(
			stylesName + '.less',
			imports.join('\n\n'),
			{src: true}
		)
			.pipe(gulp.dest(
				plugins.lib.pathHelper.getTemporaryDirectory(config)
			));
	}
};