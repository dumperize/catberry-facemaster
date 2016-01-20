'use strict';

module.exports = MasterList;

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
    this._uhr = $uhr;
    this._currentFeed = [];
    this.$context.setDependency('Tag');
}

MasterList.prototype._currentFeed = null;
MasterList.prototype._currentPage = 1;
MasterList.prototype._isFinished = false;

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
MasterList.prototype._uhr = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
MasterList.prototype.$lifetime = 60000;

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
            return self._loadDataPerPage(self._currentPage, tag.rubrika.id, tag.tag.id);
        })
        .then(function (result) {
            if (!result || result.length === 0) {
                self._isFinished = true;
                return self._currentFeed;
            } else {
                self._strucrurResult(result);
            }
            self._currentFeed = self._currentFeed.concat(result);
            return self._currentFeed;
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
MasterList.prototype._loadDataPerPage = function (page, rubrikaID, tagID) {
    var self = this;
    var path = 'http://api-fm.present-tlt.ru/master/active';
    var options = {
        data: {
            filter: '["and",["=", "rubrikaID", "' + rubrikaID + '"]]',
            expand: 'comments,sales,videos,vkLikes,albums,contacts,page,company',
            order: 'sort',
            page: page
        }
    };
    if (tagID) {
        path = 'http://api-fm.present-tlt.ru/master/bytag/' + tagID;
    }

    return self._uhr.get(path, options)
        .then(function (result) {
            if (result.status.code >= 400 && result.status.code < 600) {
                throw new Error(result.status.text);
            }
            return result.content;
        });
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
/**
 * Handles action named "some-action" from any component.
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
MasterList.prototype.handleGetNextPage = function () {
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
