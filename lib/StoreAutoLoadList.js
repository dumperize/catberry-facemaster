'use strict';

module.exports = StoreAutoLoadList;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "master/masterList" store.
 * @constructor
 */
function StoreAutoLoadList() {
    this._uhr = this.$context.locator.resolve('uhr');
    this._config = this.$context.locator.resolve('config');
    this._currentFeed = [];
    this._path = this._config.api;
    this._options = {};
}

StoreAutoLoadList.prototype._currentFeed = null;
StoreAutoLoadList.prototype._currentPage = 1;
StoreAutoLoadList.prototype._isFinished = false;

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
StoreAutoLoadList.prototype._uhr = null;

StoreAutoLoadList.prototype._config = null;
/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
StoreAutoLoadList.prototype.$lifetime = 60000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
StoreAutoLoadList.prototype.load = function () {
    var self = this;

    return this._loadDataPerPage(this._currentPage)
        .then(function (result) {
            if (!result || result.length === 0) {
                self._isFinished = true;
                return self._currentFeed;
            }
            self._currentFeed = self._currentFeed.concat(result);
            return self._currentFeed;
        });
};

StoreAutoLoadList.prototype._loadDataPerPage = function (page) {
    this._options.data.page = page;

    return this._uhr.get(this._path, this._options)
        .then(function (result) {
            if (result.status.code >= 400 && result.status.code < 600) {
                throw new Error(result.status.text);
            }
            return result.content;
        })
};

/**
 * Handles action named "some-action" from any component.
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
StoreAutoLoadList.prototype.handleGetNextPage = function () {
    if (this._isFinished) {
        return null;
    }
    var self = this;
    return Promise.resolve()
        .then(function () {
            if (!self._currentFeed || self._currentFeed.length === 0) {
                return self.load();
            }
        })
        .then(function (d) {
            self._currentPage++;
            self.$context.changed();
        });

};
