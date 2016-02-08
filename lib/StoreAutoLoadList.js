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

    return this._load()
        .then(function (result) {
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
