'use strict';

module.exports = Search;

var util = require('util'),
    StoreAutoLoadList = require('../../lib/StoreAutoLoadList');

/**
 * наследуемся от пагинатора для базового стора
 */
util.inherits(Search, StoreAutoLoadList);

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
function Search() {
    StoreAutoLoadList.call(this);
    this._path = '/search/search';
    this._data = {data: {}};
}


Search.prototype._loadDataPerPage = function (page) {
    var self = this;
    this._data.data.page = page;
    try {
        this._data.data['SearchForm[query]'] = this.$context.location.query.values.query;
    } catch (e) {
    }
    return this.send(this._path, this._data)
        .then(function (result) {
            if (result.success) {
                if (self._currentPage >= result.total)
                    self._isFinished = true;
                return result.list;
            }
            self._isFinished = true;
            return [];
        })
};
