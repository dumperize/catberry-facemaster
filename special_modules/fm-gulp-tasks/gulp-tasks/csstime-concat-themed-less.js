'use strict';

var task = require('../tasks/concat-named-less'),
	path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: ['csstime-remove-tmp-themed-styles'],
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