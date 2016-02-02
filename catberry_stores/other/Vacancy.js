'use strict';
var dateFormat = require('../../lib/util/DateFormat');

module.exports = Vacancy;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "other/vacancy" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function Vacancy($uhr) {
    var now = Date.now();
    now = dateFormat(now, "yyyy-mm-dd");

    this._uhr = $uhr;
    this._config = this.$context.locator.resolve('config');
    this._path = this._config.api + '/about-vacancy';
    this._option = {
        data: {
            filter: '["and",["<=","createDate","' + now + '"],[">=", "endDate", "' + now + '"],["=", "status", "1"]]'
        }
    };
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
Vacancy.prototype._uhr = null;

Vacancy.prototype._config = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
Vacancy.prototype.$lifetime = 60000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
Vacancy.prototype.load = function () {
    return this._uhr.get(this._path, this._option)
        .then(function (result) {
            if (result.status.code >= 400 && result.status.code < 600) {
                throw new Error(result.status.text);
            }

            return result.content;
        });
};