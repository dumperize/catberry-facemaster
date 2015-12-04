'use strict';

var task = require('../tasks/concat-named-less');

module.exports = function (gulp, plugins, config) {
	var dependencies = [
		'csstime-remove-tmp-styles',
		'csstime-collect-images',
		'csstime-collect-svg'
	];

	if (config.useImageSprites) {
		dependencies.push('csstime-collect-sprites');
	}

	return {
		dependencies: dependencies,
		task: function () {
			return task.run(config.stylesFileName, gulp, plugins, config);
		}
	};
};