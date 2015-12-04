'use strict';

var fs = require('fs'),
	path = require('path');

module.exports = {

	/**
	 * Loads one task.
	 * @param {Gulp} gulp
	 * @param {string} tasksDir
	 * @param {string} taskName
	 * @param {Object} plugins
	 * @param {Object} config
	 */
	loadTask: function (gulp, tasksDir, taskName, plugins, config) {
		var taskData = require(path.join(
			tasksDir,
			taskName
		))(gulp, plugins, config);

		gulp.task(taskName, taskData.dependencies || [], taskData.task);
	},

	/**
	 * Loads all tasks.
	 * @param {Gulp} gulp
	 * @param {string} tasksDir
	 * @param {Object} plugins
	 * @param {Object} config
	 */
	loadAllTasks: function (gulp, tasksDir, plugins, config) {
		fs.readdirSync(tasksDir)
			.map(cropExtension)
			.forEach(function (taskName) {
				module.exports
					.loadTask(gulp, tasksDir, taskName, plugins, config);
			});
	}
};

function cropExtension(fileName) {
	return fileName.replace(/\.js$/i, '');
}