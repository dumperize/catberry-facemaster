'use strict';

module.exports = MasterItem;

var util = require('util'),
    StoreBase = require('../../lib/StoreBase');

/**
 * наследуемся от пагинатора для базового стора
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
    console.log("constructor");

    this._path = '/master';
    this._options = {
        data: {
            filter: '["and", ["=", "id", ":id"],["=","publicStatus", "1"]]',
            expand: 'contacts,articles,comments,districts,albums,sales,schedule,videos,workCondition,callbacks,vkLikes,rubrika,tags,company'
        }
    };
}

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
MasterItem.prototype.load = function () {
    var self = this;
    return this.$context.getStoreData('master/MasterPage')
        .then(function (page) {
            self._optionsData.data.filter[':id'] = page.masterID;
            return self._load()
                .then(function (result) {
                    if (result.content.length == 0)
                        self.$context.notFound();

                    var data = result.content[0];
                    data.services = JSON.parse(data.services);
                    data.isBlock = {
                        service: {
                            access: page.services,
                            name: "Услуги",
                            active: true
                        },
                        work: {
                            access: true,
                            name: "Условия работы",
                            active: true
                        },
                        sale: {
                            access: page.sales,
                            name: "Скидки и подарки",
                            active: (data.sales.length > 0)
                        },
                        about: {
                            access: true,
                            name: "О себе",
                            active: data.aboutEduc || data.aboutExp || data.aboutAddInfo
                        },
                        article: {
                            access: page.articles,
                            name: "Полезно почитать",
                            active: (data.articles.length > 0)
                        },
                        photo: {
                            access: page.albums,
                            name: "Фото",
                            active: (data.albums.length > 0)
                        },
                        video: {
                            access: page.videos,
                            name: "Видео",
                            active: (data.videos.length > 0)
                        },
                        link: {
                            access: page.links,
                            name: "Ссылки",
                            active: (data.contacts.links)
                        },
                        review: {
                            access: page.comments,
                            name: "Отзывы и рекомендации",
                            active: true
                        }
                    };
                    data.page = page;
                    return data;
                });
        });
};
