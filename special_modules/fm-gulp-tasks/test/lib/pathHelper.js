'use strict';

var path = require('path'),
	assert = require('assert'),
	pathHelper = require('../../lib/pathHelper'),
	config = require('../../default.config.json');

var TEST_COMPONENTS_DIR = 'test/mocks/app/src/components',
	FAKE_DIR = TEST_COMPONENTS_DIR + 'fake',
	TEST_COMPONENTS_PATHS = [
		'document',
		'elements/icon',
		'elements/logo',
		'layout/content',
		'layout/footer',
		'layout/header'
	];

describe('lib/pathHelper.js', function () {

	describe('getAssetsGlobPatterns()', function () {

		it('should return empty array', function (done) {
			config.componentsRootDirs = [];

			var patterns = pathHelper.getAssetsGlobPatterns(config);
			assert.deepEqual(patterns, []);
			done();
		});

		it('should return array with single pattern', function (done) {
			config.componentsRootDirs = [TEST_COMPONENTS_DIR];

			var patterns = pathHelper.getAssetsGlobPatterns(config, null);
			assert.deepEqual(
				patterns,
				[
					path.join(
						TEST_COMPONENTS_DIR,
						'**',
						config.componentAssetsDir
					)
				]
			);
			done();
		});

		it('should return array with two patterns', function (done) {
			config.componentsRootDirs = [TEST_COMPONENTS_DIR, FAKE_DIR];

			var patterns = pathHelper.getAssetsGlobPatterns(config, null);
			assert.deepEqual(
				patterns,
				[
					path.join(
						TEST_COMPONENTS_DIR,
						'**',
						config.componentAssetsDir
					),
					path.join(
						FAKE_DIR,
						'**',
						config.componentAssetsDir
					)
				]
			);
			done();
		});

		it('should return array with single pattern for subdir', function (done) {
			config.componentsRootDirs = [TEST_COMPONENTS_DIR];

			var patterns = pathHelper.getAssetsGlobPatterns(config, config.lessDir);
			assert.deepEqual(
				patterns,
				[
					path.join(
						TEST_COMPONENTS_DIR,
						'**',
						config.componentAssetsDir,
						config.lessDir
					)
				]
			);
			done();
		});
	});

	describe('getAssetsDirectories()', function () {

		it('should return empty array', function (done) {
			config.componentsRootDirs = [];

			var directories = pathHelper.getAssetsDirectories(config);
			assert.deepEqual(directories, []);
			done();
		});

		it('should return empty array for zero results', function (done) {
			config.componentsRootDirs = [FAKE_DIR];

			var directories = pathHelper.getAssetsDirectories(config);
			assert.deepEqual(directories, []);
			done();
		});

		it('should return directories to assets of components', function (done) {
			config.componentsRootDirs = [TEST_COMPONENTS_DIR];

			var directories = pathHelper.getAssetsDirectories(config);
			assert.deepEqual(
				directories,
				TEST_COMPONENTS_PATHS.map(function (componentPath) {
					return path.join(
						TEST_COMPONENTS_DIR,
						componentPath,
						config.componentAssetsDir
					);
				})
			);
			done();
		});
	});

	describe('renamePathToComponentName()', function () {

		it('should return renamed path with subdir', function (done) {
			var filePath = {
					dirname: TEST_COMPONENTS_DIR + '/elements/logo/assets/images'
				};

			pathHelper.renamePathToComponentName(config, filePath);
			assert.equal(filePath.dirname, 'logo/images');
			done();
		});

		it('should return renamed path', function (done) {
			var filePath = {
				dirname: TEST_COMPONENTS_DIR + '/elements/logo/assets'
			};

			pathHelper.renamePathToComponentName(config, filePath);
			assert.equal(filePath.dirname, 'logo');
			done();
		});

		it('should return renamed path with subdir', function (done) {
			var filePath = {
				dirname: TEST_COMPONENTS_DIR + '/document/assets/images'
			};

			pathHelper.renamePathToComponentName(config, filePath);
			assert.equal(filePath.dirname, 'document/images');
			done();
		});

		it('should return renamed path', function (done) {
			var filePath = {
				dirname: TEST_COMPONENTS_DIR + '/document/assets'
			};

			pathHelper.renamePathToComponentName(config, filePath);
			assert.equal(filePath.dirname, 'document');
			done();
		});
	});
});