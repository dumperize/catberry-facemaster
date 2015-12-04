'use strict';

var path = require('path'),
	glob = require('glob');

var cacheForComponentsNames = {};

module.exports = {

	/**
	 * Gets assets directories.
	 * @param {Object} config
	 * @returns {Array<string>}
	 */
	getAssetsDirectories: function (config) {
		var globPatterns = module.exports.getAssetsGlobPatterns(config, null),
			directories = [];

		globPatterns.forEach(function (globPattern) {
			directories = directories.concat(glob.sync(globPattern));
		});

		var mainIndex = -1,
			reg = new RegExp('[\\\\/]' + config.indexComponentName +
				'[\\\\/]' + config.componentAssetsDir + '$');

		directories.every(function (dir, index) {
			if (reg.test(dir)) {
				mainIndex = index;
				return false;
			}
			return true;
		});

		if (mainIndex >= 0) {
			var indexComponentDir = directories.splice(mainIndex, 1);
			directories.unshift(indexComponentDir[0]);
		}

		return directories;
	},

	/**
	 * Gets patterns for glob.
	 * @param {Object} config
	 * @param {string|null} subDirectoryOrFile
	 * @returns {Array<string>}
	 */
	getAssetsGlobPatterns: function (config, subDirectoryOrFile) {
		var componentsDirs = config.componentsRootDirs || [];
		return componentsDirs.map(function (componentsDir) {
			return path.join(
				componentsDir,
				'**',
				subDirectoryOrFile ?
					path.join(config.componentAssetsDir, subDirectoryOrFile) :
					config.componentAssetsDir
			);
		});
	},

	/**
	 * Gets static files glob pattern.
	 * @param {Object} config
	 * @param {string} subDirectoryOrFile
	 * @returns {string}
	 */
	getStaticFilesGlobPattern: function (config, subDirectoryOrFile) {
		return path.join(
			subDirectoryOrFile ?
				path.join(config.staticRootDir, subDirectoryOrFile) :
				config.staticRootDir
		);
	},

	/**
	 * Gets assets of components destination directory.
	 * @param {Object} config
	 * @returns {string}
	 */
	getAssetsDestinationDirectory: function (config) {
		return path.join(
			module.exports.getDestinationDirectory(config),
			config.destinationComponentsDir
		);
	},

	/**
	 * Gets destination directory.
	 * @param {Object} config
	 * @returns {string}
	 */
	getDestinationDirectory: function (config) {
		return path.join(
			config.destinationDir
		);
	},

	/**
	 * Gets temporary directory.
	 * @param {Object} config
	 * @returns {string}
	 */
	getTemporaryDirectory: function (config) {
		return path.join(
			module.exports.getDestinationDirectory(config),
			config.temporaryDir
		);
	},

	/**
	 * Gets destination directory in temporary directory.
	 * @param {Object} config
	 */
	getTemporaryDestinationDirectory: function (config) {
		return path.join(
			module.exports.getTemporaryDirectory(config),
			module.exports.getDestinationDirectory(config)
		);
	},

	/**
	 * Gets assets destination directory in temporary directory.
	 * @param {Object} config
	 */
	getTemporaryAssetsDestinationDirectory: function (config) {
		return path.join(
			module.exports.getTemporaryDirectory(config),
			module.exports.getAssetsDestinationDirectory(config)
		);
	},

	/**
	 * Renames path to component name.
	 * @param {Object} config
	 * @param {Object} filePath
	 */
	renamePathToComponentName: function (config, filePath) {
		var reg = new RegExp('(.+)[\\\\/]' +
				config.componentAssetsDir + '[\\\\/]?(.*)$'),
			match = filePath.dirname.match(reg);

		if (!match) {
			return;
		}

		var componentPath = match[1],
			name = null;

		if (componentPath in cacheForComponentsNames) {
			name = cacheForComponentsNames[componentPath];
		} else {
			var jsonPath =
					path.join(process.cwd(), componentPath, config.componentJSON),
				json = require(jsonPath);

			cacheForComponentsNames[componentPath] = json.name;
			name = json.name;
		}

		filePath.dirname =  match[2] ? path.join(name, match[2]) : name;
	}
};