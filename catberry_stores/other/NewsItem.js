'use strict';

module.exports = NewsItem;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "other/NewsItem" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function NewsItem($uhr) {
    this._uhr = $uhr;
    this._config = this.$context.locator.resolve('config');
    this._path = this._config.api + '/about-news';
    this._option = {
        data: {
            filter: '["and",["=","id",":id"],["=", "status", "1"]]'
        }
    };
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
NewsItem.prototype._uhr = null;
NewsItem.prototype._config = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
NewsItem.prototype.$lifetime = 60000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
NewsItem.prototype.load = function () {
    var self = this;
    var item = this.$context.state.item;
    if (!item)
        return;

    this._option.data.filter = this._option.data.filter.replace(/:id/g, item);

    return this._uhr.get(this._path, this._option)
        .then(function (result) {
            if (result.status.code >= 400 && result.status.code < 600) {
                throw new Error(result.status.text);
            }
            if (result.content.length == 0)
                self.$context.notFound();

            return result.content[0];
        });
};