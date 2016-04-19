'use strict';

module.exports = SearchMasterList;

var util = require('util'),
    StoreAutoLoadList = require('../../lib/StoreAutoLoadList');

/**
 * наследуемся от пагинатора для базового стора
 */
util.inherits(SearchMasterList, StoreAutoLoadList);

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "tag" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function SearchMasterList() {
    StoreAutoLoadList.call(this);
    this.$context.setDependency('search/Search');
}


SearchMasterList.prototype._loadDataPerPage = function (page) {
    //var self = this;
    //this._options.data.page = page;
    //return this._load()
    //    .then(function (result) {
    //        var total = result.status.headers['x-pagination-page-count'];
    //
    //        if (self._currentPage >= total)
    //            self._isFinished = true;
    //
    //        return result.content;
    //    })
    return this.$context.getStoreData('search/Search')
        .then(function (data) {
            if (data.success)
                return data.obj;
            return null;
        });
};
/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
//SearchMasterList.prototype.load = function () {
//    return this.$context.getStoreData('search/Search')
//        .then(function (data) {
//            if (data.success)
//                return data.obj;
//            return null;
//        })
//};