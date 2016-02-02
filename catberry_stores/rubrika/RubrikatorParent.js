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
    this._config = this.$context.locator.resolve('config');

    this._path = this._config.api + '/rubrika';
    this._options = {
        data: {
            filter: '["and",["=", "parentID", "0"]]',
            order: 'name',
            limit: 200
        }
    };
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
RubrikatorParent.prototype._uhr = null;
RubrikatorParent.prototype._config = null;

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
    return this._uhr.get(this._path, this._options)
        .then(function (result) {
            if (result.status.code >= 400 && result.status.code < 600) {
                throw new Error(result.status.text);
            }
            return result.content;
        });
};
