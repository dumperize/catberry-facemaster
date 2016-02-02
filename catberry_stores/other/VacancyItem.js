'use strict';

var dateFormat = require('../../lib/util/DateFormat');

module.exports = VacancyItem;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "other/vacancyItem" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function VacancyItem($uhr) {
    this._uhr = $uhr;
    this._config = this.$context.locator.resolve('config');

    var now = Date.now();
    now = dateFormat(now, "yyyy-mm-dd");

    this._path =  this._config.api + '/about-vacancy';
    this._options = {
        data: {
            filter: '["and",["=", "id", ":id"],["<=","createDate","' + now + '"],[">=", "endDate", "' + now + '"],["=", "status", "1"]]'
        }
    };
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
VacancyItem.prototype._uhr = null;
VacancyItem.prototype._config = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
VacancyItem.prototype.$lifetime = 60000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
VacancyItem.prototype.load = function () {
    var self = this;
    var id = this.$context.state.item;
    if (!id)
        return;

    this._options.data.filter = this._options.data.filter.replace(/:id/g, id);
    return this._uhr.get(this._path, this._options)
        .then(function (result) {
            if (result.status.code >= 400 && result.status.code < 600) {
                throw new Error(result.status.text);
            }
            if (result.content.length == 0)
                self.$context.notFound();

            return result.content[0];
        });
};

/**
 * Handles action named "some-action" from any component.
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
VacancyItem.prototype.handleSomeAction = function () {
    // Here you can call this.$context.changed() if you know
    // that remote data source has been changed.
    // Also you can have many handle methods for other actions.
};
