'use strict';

module.exports = MasterItem;

var dateFormat = require('../../lib/util/DateFormat');
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

    this._path = '/master-page';
    this._options = {
        data: {
            filter: '["and", ["=","number", ":number"],["<=", "dateStart", ":dateStart"],[">=", "dateEnd", ":dateEnd"]]'
        }
    };

    this._pathForPage = '/master';
    this._optionsForPage = {
        data: {
            filter: '["and", ["=", "id", ":id"],["=","publicStatus", "1"]]',
            expand: 'contacts,articles,comments,districts,albums,sales,schedule,videos,workCondition,callbacks,vkLikes,rubrika,tags,company'
        }
    };
    this._optionsForPageData = {
        data: {
            filter: {},
            expand: {}
        }
    }
}

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
MasterItem.prototype.load = function () {
    var self = this;
    var id = this.$context.state.item;
    if (!id)
        return;

    var now = Date.now();
    now = dateFormat(now, "yyyy-mm-dd");
    this._optionsData.data.filter[':number'] = id;
    this._optionsData.data.filter[':dateStart'] = now;
    this._optionsData.data.filter[':dateEnd'] = now;

    return this._load()
        .then(function (result) {
            if (result.content.length == 0)
                self.$context.notFound();

            return result.content[0];
        })
        .then(function (page) {
            self._optionsForPageData.data.filter[':id'] = page.masterID;

            return self._loadByParam(self._pathForPage, self._setOptions(self._optionsForPage, self._optionsForPageData))
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
