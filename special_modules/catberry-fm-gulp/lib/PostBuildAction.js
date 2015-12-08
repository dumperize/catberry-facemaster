/*
 * catberry-assets
 *
 * Copyright (c) 2015 Denis Rechkunov and project contributors.
 *
 * catberry-assets's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This license applies to all parts of catberry-assets that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = PostBuildAction;

var util = require('util'),
    path = require('path');

var INFO_START = 'Starting fm building...';

/**
 * Creates new instance of the assets post build action.
 * @param {Object} $config Catberry application config.
 * @param {Logger} $logger Logger.
 * @constructor
 */
function PostBuildAction($config, $logger) {
    this._isRelease = Boolean($config.isRelease);
    this._config = $config.assets || {};
    this._config.componentJSON = this._config.componentJSON ||
        'cat-component.json';
    this._config.destinationDir = this._config.destinationDir ||
        $config.publicDirectoryPath || 'public';
    this._config.destinationComponentsDir =
        this._config.destinationComponentsDir || 'assets';
    this._config.cdnPath = this._config.cdnPath || '/assets/';
    this._logger = $logger;
}

/**
 * Current assets configuration.
 * @type {Object}
 * @private
 */
PostBuildAction.prototype._config = null;

/**
 * Current application release mode flag.
 * @type {boolean}
 * @private
 */
PostBuildAction.prototype._isRelease = false;

/**
 * Build application assets.
 * @param {StoreFinder} storeFinder Catberry store finder.
 * @param {ComponentFinder} componentFinder Catberry component finder.
 * @returns {Promise} Promise for nothing.
 */
PostBuildAction.prototype.action = function (storeFinder, componentFinder) {

    var self = this;
    self._logger.info(INFO_START);
    return componentFinder.find()
        .then(function (components) {
            var directories = {};
            Object.keys(components)
                .forEach(function (componentName) {
                    var component = components[componentName],
                        componentDirectory = path.dirname(component.path),
                        parentDirectory = path.dirname(componentDirectory);
                    directories[parentDirectory] = true;
                });
            self._config.componentsRootDirs = Object.keys(directories);
            //fmGulp.loadGulpTasks(gulp, self._config);

            var walle = require('../walle/gulpfile.js');
            walle.setEnv(self);
            walle.start();
        });
};
