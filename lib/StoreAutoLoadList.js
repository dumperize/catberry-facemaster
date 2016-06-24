'use strict';

module.exports = StoreAutoLoadList;

var util = require('util'),
    StoreBase = require('../lib/StoreBase');

/**
 * наследуемся от пагинатора для базового стора
 */
util.inherits(StoreAutoLoadList, StoreBase);

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
    StoreBase.call(this);
    this._currentFeed = [];
}

StoreAutoLoadList.prototype._currentFeed = null;
StoreAutoLoadList.prototype._currentPage = 1;
StoreAutoLoadList.prototype._isFinished = false;


/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
StoreAutoLoadList.prototype.load = function () {
    return this._getAll();
};

StoreAutoLoadList.prototype._getAll = function () {
    var self = this;
    return this._loadDataPerPage(this._currentPage)
        .then(function (result) {
            self._currentFeed[self._currentPage] = result;

            var full = [];
            self._currentFeed.forEach(function (page) {
                full = full.concat(page);
            });

            return {
                isFinished: self._isFinished,
                list: full,
                sort: self._options.data.order
            };
        });
};

StoreAutoLoadList.prototype._loadDataPerPage = function (page) {
    var self = this;
    this._options.data.page = page;
    return this._load()
        .then(function (result) {
            var total = result.status.headers['x-pagination-page-count'];

            if (self._currentPage >= total)
                self._isFinished = true;

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
            if (!self._currentFeed || Object.keys(self._currentFeed).length === 0) {
                return self.load();
            }
        })
        .then(function (d) {
            self._currentPage++;
            self.$context.changed();
        });

};
