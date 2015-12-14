'use strict';

module.exports = News;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "other/News" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function News($uhr) {
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
News.prototype._uhr = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
News.prototype.$lifetime = 60000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
News.prototype.load = function () {
	var self = this;
	var path = 'http://api-fm.present-tlt.ru/about-news/index?filter=%5B%5B%22%3D%22%2C%22status%22%2C%221%22%5D%5D&page=';

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
					news: result.content
				};
			});
};


News.prototype.handleGetPaginator = function () {
	if (!this._pageCount || this._pageCount == 1) {
		return {
			"is-paginator": false
		}
	}
	return {
		"is-paginator": true,
		"url": "/news/page/",
		"count": this._pageCount,
		"current": this._currentPage
	};
};