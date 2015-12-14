'use strict';

module.exports = Recommendation;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "other/Recommendation" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function Recommendation($uhr) {
    this._uhr = $uhr;
    this.$context.setDependency("Paginator");
    this._pageCount;
    this._currentPage;
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
Recommendation.prototype._uhr = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
Recommendation.prototype.$lifetime = 60000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
Recommendation.prototype.load = function () {
    // Here you can do any HTTP requests using this._uhr.
    // Please read details here https://github.com/catberry/catberry-uhr.
    var self = this;
    var path = 'http://api-fm.present-tlt.ru/about-comment?page=';

    return Promise.resolve(1)
        .then(function () {
            return self.$context.sendAction("Paginator", "getCurrentPage");
        })
        .then(function (page) {
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
                recommendation: result.content
            };
        });
};


Recommendation.prototype.handleGetPaginator = function () {
    if (!this._pageCount || this._pageCount == 1) {
        return {
            "is-paginator": false
        }
    }
    return {
        "is-paginator": true,
        "url": "/recommendation/page/",
        "count": this._pageCount,
        "current": this._currentPage
    };
};