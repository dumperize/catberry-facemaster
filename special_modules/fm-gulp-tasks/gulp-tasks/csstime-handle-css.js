'use strict';

var task = require('../tasks/handle-named-css');

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: ['csstime-compile-less'],
		task: function () {
			return task.run(config.stylesFileName, gulp, plugins, config);
		}
	};
};