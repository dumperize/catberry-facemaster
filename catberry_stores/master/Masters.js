'use strict';

module.exports = Masters;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "master/masters" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function Masters($uhr) {
    this._uhr = $uhr;
    this.$context.setDependency('rubrika/Rubrika');
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
Masters.prototype._uhr = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
Masters.prototype.$lifetime = 60000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
Masters.prototype.load = function () {
    return this.$context.sendAction("rubrika/Rubrika", "getCurrentPodrubrika")
        .then(function () {

        });
};

/**
 * Handles action named "some-action" from any component.
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
Masters.prototype.handleSomeAction = function () {
    // Here you can call this.$context.changed() if you know
    // that remote data source has been changed.
    // Also you can have many handle methods for other actions.
};
