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

    this._currentFeed = {};
    this._pathBase = '/master';
    this._path = this._pathBase + '/active';
    this._options = {
        data: {
            filter: '["and",["=", "rubrikaID", ":rubrikaID"]]',
            expand: 'comments,sales,videos,vkLikes,albums,contacts,page,company',
            order: 'sort'
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
            self._clearFeed(tag);

            self._optionsData.data.filter[':rubrikaID'] = tag.rubrika.id;
            if (tag.tag.id) {
                self._path = self._pathBase + '/bytag/' + tag.tag.id;
            }
            return self._loadDataPerPage(self._currentPage);
        })
        .then(function (result) {
            if (!result || result.length === 0) {
                self._isFinished = true;
                return self._currentFeed;
            } else {
                self._isEmpty = false;
                self._strucrurResult(result);
            }
            result.forEach(function (el) {
                self._currentFeed[el.id] = el;
            });
            //self._currentFeed = self._currentFeed.concat(result);
            return self._currentFeed;
        });
};

MasterList.prototype._clearFeed = function (tag) {
    this._currentRubrika = this._currentRubrika || tag.rubrika.id;
    this._currentTag = this._currentTag || tag.tag.id;
    if (this._currentRubrika != tag.rubrika.id || this._currentTag != tag.tag.id) {
        this._currentFeed = {};
        this._currentPage = 1;
        this._isFinished = false;
        this._currentRubrika = tag.rubrika.id;
        this._currentTag = tag.tag.id;
    }
};

MasterList.prototype._strucrurResult = function (result) {
    result.forEach(function (master) {
        master.services = JSON.parse(master.services);
        if (master.vkLikes) {
            master.vkLikes.countLikes = master.vkLikes.countLikes ? master.vkLikes.countLikes : 0;
        } else {
            master.vkLikes = {};
            master.vkLikes.countLikes = 0;
        }
    });
};