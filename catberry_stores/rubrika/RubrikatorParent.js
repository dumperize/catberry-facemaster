'use strict';

module.exports = RubrikatorParent;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "rubrika/RubrikatorParent" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function RubrikatorParent($uhr) {
    this._uhr = $uhr;
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
RubrikatorParent.prototype._uhr = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
RubrikatorParent.prototype.$lifetime = 60000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
RubrikatorParent.prototype.load = function () {
    var path = 'http://api-fm.present-tlt.ru/rubrika';
    var options = {
        data: {
            filter: '["and",["=", "parentID", "0"]]',
            order: 'name',
            limit: 200
        }
    };
    return this._uhr.get(path, options)
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
RubrikatorParent.prototype.handleSomeAction = function () {
    // Here you can call this.$context.changed() if you know
    // that remote data source has been changed.
    // Also you can have many handle methods for other actions.
};
