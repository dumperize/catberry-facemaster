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
    this._path = '/search';
    this._options = {
        data: {
            expand: 'activeComments,activeSales,activeVideos,vkLikes,activeAlbums,contacts,company,rubrika,publication'
        }
    };
}

Search.prototype.rubrikaID = null;

Search.prototype._loadDataPerPage = function (page) {
    //console.log(page);
    var self = this;
    if (this.rubrikaID != this.$context.state.rubrikaID) {
        this.rubrikaID = this.$context.state.rubrikaID;
        this._clearFeed();
    }

    this._options.data.page = page;
    try {
        this._options.data['query'] = this.$context.location.query.values.query;
        if (this.rubrikaID) {
            this._options.data.filter = JSON.stringify({rubrikaID: this.rubrikaID});
        }
    } catch (e) {
    }
    return this._load()
        .then(function (result) {
            var pageCount = result.status.headers['x-pagination-page-count'];
            if (self._currentPage > pageCount) return [];
            if (self._currentPage == pageCount) {
                self._isFinished = true;
            }
            return result.content;
        })
};
