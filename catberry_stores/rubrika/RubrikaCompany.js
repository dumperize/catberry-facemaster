'use strict';

module.exports = RubrikaCompany;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "rubrika/RubrikaCompany" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function RubrikaCompany($uhr) {
    this._uhr = $uhr;
    this._config = this.$context.locator.resolve('config');

    this._path = this._config.api + '/company/byrubrikacompany/';
    this._options = {
        data: {
            order: 'sort',
            expand: 'mastersData'
        }
    };
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
RubrikaCompany.prototype._uhr = null;
RubrikaCompany.prototype._config = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
RubrikaCompany.prototype.$lifetime = 60000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
RubrikaCompany.prototype.load = function () {
    var self = this;
    var id = this.$context.state.catalog;
    if (!id)
        this.$context.notFound();

    return this._uhr.get(this._path + id, this._options)
        .then(function (result) {
            if (result.status.code == 404) {
                self.$context.notFound();
            }
            if (result.status.code >= 400 && result.status.code < 600) {
                throw new Error(result.status.text);
            }
            return result.content;
        });
};
