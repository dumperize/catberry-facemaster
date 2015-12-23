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
    this._uhr = $uhr;
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
Vacancy.prototype._uhr = null;

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
    var path = 'http://api-fm.present-tlt.ru/about-vacancy';
    var now = Date.now();
    now = dateFormat(now, "yyyy-mm-dd");

    var option = {
        data: {
            filter: '[["<=","createDate","' + now + '"],[">=", "endDate", "' + now + '"],["=", "status", "1"]]'
        }
    };
    return this._uhr.get(path, option)
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
Vacancy.prototype.handleSomeAction = function () {
    // Here you can call this.$context.changed() if you know
    // that remote data source has been changed.
    // Also you can have many handle methods for other actions.
};
