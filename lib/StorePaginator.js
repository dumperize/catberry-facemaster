'use strict';

module.exports = StorePaginator;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function StorePaginator() {
    this._uhr = this.$context.locator.resolve('uhr');
    this._pageCount = 1;
    this._currentPage = 1;
    this._path = '';
    this._url = '';

    this.$context.setDependency("Paginator");
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
StorePaginator.prototype._uhr = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
StorePaginator.prototype.$lifetime = 60000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
StorePaginator.prototype.load = function () {
    var self = this;
    var path = this._path;
    console.log("");
    console.log("");
    console.log("load");
    console.log("");
    console.log("");

    return Promise.resolve(1)
        .then(function () {
            return self.$context.sendAction("Paginator", "getCurrentPage");
        })
        .then(function (page) {
            console.log("page", page);
            self._currentPage = page;
            return self._uhr.get(path + page)
        })
        .then(function (result) {
            if (result.status.code >= 400 && result.status.code < 600) {
                throw new Error(result.status.text);
            }

            self._pageCount = result.status.headers['x-pagination-page-count'];
            return {
                currentPage: self._currentPage,
                data: result.content
            };
        });
};


StorePaginator.prototype.handleGetPaginator = function () {
    if (!this._pageCount || this._pageCount == 1) {
        return {
            "is-paginator": false
        }
    }
    return {
        "is-paginator": true,
        "url": this._url,
        "count": this._pageCount,
        "current": this._currentPage
    };
};