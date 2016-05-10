'use strict';

var PAGES = require("../config/pages.json");

module.exports = Head;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "head" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function Head($uhr) {
    this._uhr = $uhr;
    this.currentPage = "main";
    this.$context.setDependency('Pages');
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
Head.prototype._uhr = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
Head.prototype.$lifetime = 60000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
Head.prototype.load = function () {
    var self = this;
    var func = {
        "article": this._loadForCatalog,
        "article-item": this._loadForArticleItem,
        "company-page": this._loadForCompanyItem,
        "company-rubrika": this._loadForCompanyRubrika,
        "konkurs-item": this._loadForKonkursItem,
        "master-page": this._loadForMasterPage,
        "master-print-card": this._loadForMasterPrintCard,
        "master-rubrika": this._loadForRubrika,
        "news-item": this._loadForNewsItem,
        "sale": this._loadForCatalog,
        "vacancy-item": this._loadForVacancyItem,
        "video": this._loadForCatalog

    };
    return this.$context.getStoreData('Pages')
        .then(function (page) {
            var getData = func[page.current];
            if (getData)
                return getData.call(self, PAGES[page.current], page.current);

            var data = PAGES[page.current];
            return {
                title: data.title + '. FaceMaster.ru. Специалисты Тольятти',
                description: data.description,
                keywords: data.keywords,
                social: data.social
            }
        });
};

Head.prototype._loadForArticleItem = function (arr) {
    return this.$context.getStoreData(arr.store)
        .then(function (data) {
            return {
                title: data.title,
                description: data.text.replace(/<\/?[^>]+>/g, '').slice(0, 100) + '...',
                keywords: data.title + ', статья, полезная информация, facemaster',
                social: {
                    title: data.title,
                    description: data.text.replace(/<\/?[^>]+>/g, '').slice(0, 100) + '...'
                }
            }
        });
};

Head.prototype._loadForCompanyItem = function (arr) {
    return this.$context.getStoreData(arr.store)
        .then(function (data) {
            return {
                title: data.name,
                description: data.name,
                keywords: data.title + ', компании, facemaster',
                social: {
                    title: data.name,
                    description: data.name
                }
            }
        });
};

Head.prototype._loadForCompanyRubrika = function (arr) {
    return this.$context.getStoreData(arr.store)
        .then(function (data) {
            return {
                title: data.name,
                description: data.name,
                keywords: data.name + ', компании, facemaster',
                social: {
                    title: data.name,
                    description: data.name
                }
            }
        });
};

Head.prototype._loadForKonkursItem = function (arr) {
    return this.$context.getStoreData(arr.store)
        .then(function (data) {
            return {
                title: data.name + ' - конкурсы газеты Презент',
                description: data.description,
                keywords: 'конкурсы, facemaster',
                social: {
                    title: data.name,
                    description: data.description
                }
            }
        });
};

Head.prototype._loadForMasterPage = function (arr) {
    return this.$context.getStoreData(arr.store)
        .then(function (data) {
            return {
                title: data.name,
                description: data.name + '. ' + data.services[0],
                keywords: data.name + ', facemaster',
                social: {
                    title: data.name,
                    description: data.name + '. ' + data.services[0]
                }
            }
        });
};

Head.prototype._loadForMasterPrintCard = function (arr) {
    return this.$context.getStoreData(arr.store)
        .then(function (data) {
            return {
                title: data.name,
                description: data.name + '. Визитка.',
                keywords: data.name + ', facemaster',
                social: {
                    title: data.name,
                    description: data.name + '. Визитка.'
                }
            }
        });
};

Head.prototype._loadForRubrika = function () {
    return this.$context.getStoreData('Tag')
        .then(function (data) {
            return {
                title: data.currentSeo.headTitle,
                description: data.currentSeo.description,
                keywords: data.currentSeo.keywords,
                social: {
                    title: data.currentSeo.headTitle,
                    description: data.currentSeo.description
                }
            }
        });
};

Head.prototype._loadForNewsItem = function () {
    return this.$context.getStoreData('other/NewsItem')
        .then(function (data) {
            return {
                title: data.title,
                description: data.text.replace(/<\/?[^>]+>/g, '').slice(0, 100) + '...',
                keywords: 'новость, facemaster',
                social: {
                    title: data.title,
                    description: data.text.replace(/<\/?[^>]+>/g, '').slice(0, 100) + '...'
                }
            }
        });
};

Head.prototype._loadForVacancyItem = function (arr) {
    return this.$context.getStoreData(arr.store)
        .then(function (data) {
            return {
                title: data.post,
                description: data.text.replace(/<\/?[^>]+>/g, '').slice(0, 100) + '...',
                keywords: data.post + ', вакансии, facemaster',
                social: {
                    title: data.post,
                    description: data.text.replace(/<\/?[^>]+>/g, '').slice(0, 100) + '...'
                }
            }
        });
};

Head.prototype._loadForCatalog = function (config, type) {
    var typeCapitalizeFirstLetter = type.charAt(0).toUpperCase() + type.slice(1);
    return this.$context.getStoreData('rubrika/Rubrikator' + typeCapitalizeFirstLetter)
        .then(function (data) {
            if (data.active)
                return {
                    title: data.active.name + ". " + config.title,
                    description: config.title,
                    keywords: config.keywords + ", " + data.active.name
                };
            return config;
        });

};

/**
 * Handles action named "some-action" from any component.
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
Head.prototype.handleSetCurrentPage = function (page) {
    this.currentPage = page;
    this.$context.changed();
};
