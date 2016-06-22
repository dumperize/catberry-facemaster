'use strict';

module.exports = MasterList;

var util = require('util'),
    StoreAutoLoadList = require('../../lib/StoreAutoLoadList');
/**
 * наследуемся от пагинатора для постраничной навигации
 */
util.inherits(MasterList, StoreAutoLoadList);
/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "master/masterList" store.
 * @param {UHR} $uhr Universal HTTP request.this
 * @constructor
 */
function MasterList($uhr) {
    StoreAutoLoadList.call(this);
    this.$context.setDependency('Tag');

    this._currentFeed = [];
    this._pathBase = '/master';
    this._path = this._pathBase + '/active';
    this._order = 'sort';
    this._options = {
        data: {
            filter: '["and",["=", "rubrikaID", ":rubrikaID"]]',
            expand: 'activeComments,activeSales,activeVideos,vkLikes,activeAlbums,contacts,company',
            order: 'sort',
            limit: 20
        }
    };
}
/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
MasterList.prototype.load = function () {
    var self = this;
    return this.$context.getStoreData('Tag')
        .then(function (tag) {
            if (!tag.rubrika)
                return;
            //сменилась рубрика отчистим списки
            self._clearFeed(tag);

            self._optionsData.data.filter[':rubrikaID'] = tag.rubrika.id;
            if (tag.tag.id) {
                self._path = self._pathBase + '/bytag/' + tag.tag.id;
            } else {
                self._path = self._pathBase + '/active';
            }
            return self._getAll();
        });
};

MasterList.prototype._clearFeed = function (tag) {
    this._currentRubrika = this._currentRubrika || tag.rubrika.id;
    this._currentTag = this._currentTag || tag.tag.id;
    if (this._currentRubrika != tag.rubrika.id || this._currentTag != tag.tag.id) {
        this._currentFeed = [];
        this._currentPage = 1;
        this._isFinished = false;
        this._currentRubrika = tag.rubrika.id;
        this._currentTag = tag.tag.id;
    }
};

MasterList.prototype.handleSetOrder = function (order) {
    console.log(order);
    if (this._order == order) return;
    this._order = order;
    this.$context.changed();
};