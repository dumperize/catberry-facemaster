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
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
NewsItem.prototype._uhr = null;

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
    var path = 'http://api-fm.present-tlt.ru/about-news';
    //var path = 'http://api-fm.present-tlt.ru/about-news?filter=%5B%5B%22%3D%22%2C%22id%22%2C%22' + item + '%22%5D%5D';

    if (!item)
        return;

    var option = {
        data: {
            filter: '[["=","id","' + item + '"],["=", "status", "1"]]'
        }
    };
    return this._uhr.get(path, option)
        .then(function (result) {
            console.log(result);
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
NewsItem.prototype.handleSomeAction = function () {

    // Here you can call this.$context.changed() if you know
    // that remote data source has been changed.
    // Also you can have many handle methods for other actions.
};
