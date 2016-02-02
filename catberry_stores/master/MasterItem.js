'use strict';

var dateFormat = require('../../lib/util/DateFormat');

module.exports = MasterItem;

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
    this._uhr = $uhr;
    this._config = this.$context.locator.resolve('config');

    this._path = this._config.api + '/master-page';
    this._options = {
        data: {
            filter: '["and", ["=","number", ":number"],["<=", "dateStart", ":dateStart"],[">=", "dateEnd", ":dateEnd"]]'
        }
    };

    this._pathForPage = this._config.api + '/master';
    this._optionForPage = {
        data: {
            filter: '["and", ["=", "id", ":id"],["=","publicStatus", "1"]]',
            expand: 'contacts,articles,comments,districts,albums,sales,schedule,videos,workCondition,callbacks,vkLikes,rubrika,tags,company'
        }
    };
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
MasterItem.prototype._uhr = null;

MasterItem.prototype._config = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
MasterItem.prototype.$lifetime = 60000;

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
    this._options.data.filter = this._options.data.filter.replace(/:number/g, id);
    this._options.data.filter = this._options.data.filter.replace(/:dateStart/g, now);
    this._options.data.filter = this._options.data.filter.replace(/:dateEnd/g, now);

    return this._uhr.get(this._path, this._options)
        .then(function (result) {
            if (result.status.code >= 400 && result.status.code < 600) {
                throw new Error(result.status.text);
            }
            if (result.content.length == 0)
                self.$context.notFound();

            return result.content[0];
        })
        .then(function (page) {
            self._optionForPage.data.filter = self._optionForPage.data.filter.replace(/:id/g, page.masterID);

            return self._uhr.get(self._pathForPage, self._optionForPage)
                .then(function (result) {
                    if (result.status.code >= 400 && result.status.code < 600) {
                        throw new Error(result.status.text);
                    }
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

/**
 * Handles action named "some-action" from any component.
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
MasterItem.prototype.handleSomeAction = function () {
    // Here you can call this.$context.changed() if you know
    // that remote data source has been changed.
    // Also you can have many handle methods for other actions.
};
