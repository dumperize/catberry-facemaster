'use strict';

module.exports = MasterListForCompany;

var util = require('util'),
    StoreBase = require('../../lib/StoreBase');
/**
 * наследуемся базового стора
 */
util.inherits(MasterListForCompany, StoreBase);
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
function MasterListForCompany($uhr) {
    StoreBase.call(this);
    this._listID = [];
    this._path = '/master/active';
    this._options = {
        data: {
            filter: '["and",["IN", "user_master.id", [:masterID]]]',
            expand: 'activeComments,activeSales,activeVideos,vkLikes,activeAlbums,contacts,publication,company,likesCount',
            order: 'sort'
        }
    };
    this.$context.setDependency('company/CompanyItem');
}

MasterListForCompany.prototype._listID = null;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
MasterListForCompany.prototype.load = function () {
    var self = this;
    if (!this._listID)
        return null;

    self._optionsData.data.filter[':masterID'] = this._listID.join(',');
    return this._load()
        .then(function (data) {
            var masters = data.content;
            if (masters)
                self._strucrurResult(masters);
            return masters;
        });
};
//дублирует MasterList - нужно будет как-то переделать
MasterListForCompany.prototype._strucrurResult = function (result) {
    result.forEach(function (master) {
        master.videos = master.activeVideos;
        master.sales = master.activeSales;
        master.articles = master.activeArticles;
        master.comments = master.activeComments;
        master.albums = master.activeAlbums;
        master.services = JSON.parse(master.services);
        if (master.vkLikes) {
            master.vkLikes.countLikes = master.vkLikes.countLikes ? master.vkLikes.countLikes : 0;
        } else {
            master.vkLikes = {};
            master.vkLikes.countLikes = 0;
        }
    });
};

MasterListForCompany.prototype.handleSetListID = function (list) {
    this._listID = list;
    return true;
};