'use strict';

var task = require('../tasks/minify-named-css'),
	path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		task: function () {
			var tasks = config.themedStylesFileNames.map(
				function (themeName) {
					return task.run(
						path.join(config.lessThemesDir, themeName),
						gulp, plugins, config
					);
				}
			);

			return plugins.mergeStream(tasks);
		}
	};
};