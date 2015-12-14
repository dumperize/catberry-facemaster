'use strict';

module.exports = StaticStoreBase;

var util = require('util');

var STATIC_INFO_FILE_TEMPLATE = '/public/html/%s.html';

/**
 * Creates new instance of basic static store.
 * @constructor
 */
function StaticStoreBase() {
    this._uhr = this.$context.locator.resolve('uhr');
}

/**
 * Current UHR to do requests.
 * @type {UHR}
 * @private
 */
StaticStoreBase.prototype._uhr = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
StaticStoreBase.prototype.$lifetime = 3660000;

/**
 * Loads static content from the server.
 * @returns {Promise<{html: string}>} Promise for HTML.
 */
StaticStoreBase.prototype.load = function () {
    var uri = this.$context.location.clone();

    if (!uri.scheme) {
        uri.scheme = 'http';
    }
    uri.query = null;
    uri.fragment = null;
    uri.path = util.format(STATIC_INFO_FILE_TEMPLATE, this.filename);

    return this._uhr.get(uri.toString())
        .then(function (result) {
            if (result.status.code < 200 || result.status.code >= 400) {
                throw new Error(result.status.text);
            }
            return {
                html: result.content || ''
            };
        });
};