'use strict';

module.exports = Rubrikator;

var README_URL = 'http://localhost:3000/data-json/rubrikator.json';
/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "rubrika/Rubrikator" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function Rubrikator($uhr) {
    this._uhr = $uhr;
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
Rubrikator.prototype._uhr = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
Rubrikator.prototype.$lifetime = 600000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
Rubrikator.prototype.load = function () {
    return this._uhr.get(README_URL)
        .then(function (result) {
            if (result.status.code >= 400 && result.status.code < 600) {
                throw new Error(result.status.text);
            }
            return result.content;
        });
};

/**
 * Handles action named "some-action" from any component.
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
Rubrikator.prototype.handleSomeAction = function () {
    // Here you can call this.$context.changed() if you know
    // that remote data source has been changed.
    // Also you can have many handle methods for other actions.
};
