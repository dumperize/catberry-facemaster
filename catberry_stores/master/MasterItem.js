'use strict';

module.exports = MasterItem;

var util = require('util'),
    StoreBase = require('../../lib/StoreBase');

/**
 * наследуемся от базового стора
 */
util.inherits(MasterItem, StoreBase);

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "master/MasterItem" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function MasterItem($uhr) {
    StoreBase.call(this);
    this.$context.setDependency('master/MasterPage');

    this._path = '/master';
    this._options = {
        data: {
            filter: '["and", ["=", "id", ":id"],["=","status", "2"]]',
            expand: 'contacts,activeArticles,activeComments,districts,activeAlbums,activeSales,schedule,activeVideos,workCondition,callbacks,vkLikes,rubrika,tags,company'
        }
    };
}

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
MasterItem.prototype.load = function () {
    var self = this;
    var masterPage, data;

    return this.$context.getStoreData('master/MasterPage')
        .then(function (page) {
            masterPage = page;
            self._optionsData.data.filter[':id'] = page.masterID;
            return self._load()
        })
        .then(function (result) {
            if (result.content.length == 0)
                self.$context.notFound();
            data = result.content[0];

            //из-за ильи так произошло!
            data.comments = data.activeComments;
            data.sales = data.activeSales;
            data.videos = data.activeVideos;
            data.albums = data.activeAlbums;
            data.articles = data.activeArticles;
            //конец из-за ильи так произошло!


            data.services = JSON.parse(data.services);
            data.page = masterPage;
            data.isBlock = self._geerateIsBlock(data);

            var promiseAlbom = self._getPhotoAlboms(data);
            var promiseCompanyContact = self._getCompanyContacts(data);
            return Promise.all([promiseAlbom, promiseCompanyContact])
        })
        .then(function (res) {
            data.albums = res[0];
            if (res[1] && res[1].contacts)
                data.contacts.workPhone = res[1].contacts.phone;
            return data;
        })
};

MasterItem.prototype._getCompanyContacts = function (data) {
    var self = this;

    if (!data.company)
        return null;

    return self.$context.sendAction("company/CompanyItemSmall", "setID", data.company.id)
        .then(function (r) {
            return self.$context.getStoreData('company/CompanyItemSmall');
        });
};

MasterItem.prototype._getPhotoAlboms = function (data) {
    var self = this;
    //соберем id альбомов
    var listID = [];

    data.albums.forEach(function (album) {
        listID.push(album.id);
    });
    return self.$context.sendAction("photo/PhotoAlbum", "setListID", listID)
        .then(function (r) {
            return self.$context.getStoreData('photo/PhotoAlbum');
        })
};

MasterItem.prototype._geerateIsBlock = function (data) {
    var masterPage = data.page;
    return {
        service: {
            access: masterPage.services,
            name: "Услуги",
            active: true
        },
        work: {
            access: true,
            name: "Условия работы",
            active: true
        },
        sale: {
            access: masterPage.sales,
            name: "Скидки и подарки",
            active: (data.sales.length > 0)
        },
        about: {
            access: true,
            name: "О себе",
            active: data.aboutEduc || data.aboutExp || data.aboutAddInfo
        },
        article: {
            access: masterPage.articles,
            name: "Полезно почитать",
            active: (data.articles.length > 0)
        },
        photo: {
            access: masterPage.albums,
            name: "Фото",
            active: (data.albums.length > 0)
        },
        video: {
            access: masterPage.videos,
            name: "Видео",
            active: (data.videos.length > 0)
        },
        link: {
            access: masterPage.links,
            name: "Ссылки",
            active: (data.contacts.links)
        },
        review: {
            access: masterPage.comments,
            name: "Отзывы и рекомендации",
            active: true
        }
    };
};