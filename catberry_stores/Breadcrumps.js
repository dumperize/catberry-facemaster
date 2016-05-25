'use strict';

var PAGES = require("../config/pages.json");

module.exports = Breadcrumps;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "breadcrumps" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function Breadcrumps($uhr) {
    this._uhr = $uhr;
    this.$context.setDependency('Pages');
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
Breadcrumps.prototype._uhr = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
Breadcrumps.prototype.$lifetime = 60000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
Breadcrumps.prototype.load = function () {
    var self = this;
    var func = {
        "article": this._loadForCatalog,
        "article-item": this._loadForArticleItem,
        "company-page": this._loadForCompanyItem,
        "company-rubrika": this._loadForCompanyRubrika,
        "konkurs-item": this._loadForKonkursItem,
        "master-page": this._loadForMasterPage,
        "master-rubrika": this._loadForRubrika,
        "news-item": this._loadForNewsItem,
        "sale": this._loadForCatalog,
        "video": this._loadForCatalog
    };
    var brcrmp = [];
    return this.$context.getStoreData('Pages')
        .then(function (page) {

            var getData = func[page.current];
            if (getData)
                return getData.call(self, PAGES[page.current], page.current);

            brcrmp.push({
                title: PAGES[page.current].title
            });
            return brcrmp;
        });
};

Breadcrumps.prototype._loadForCatalog = function (config, type) {
    var typeCapitalizeFirstLetter = type.charAt(0).toUpperCase() + type.slice(1);
    var self = this;
    return this.$context.getStoreData('rubrika/Rubrikator' + typeCapitalizeFirstLetter)
        .then(function (data) {
            var links = [];
            if (data.active) {
                links.push({
                    title: config.title,
                    url: "/" + type
                });
                links.push({
                    title: data.active.name
                });
            } else {
                links.push({
                    title: config.title
                });
            }
            return links;
        });
};

Breadcrumps.prototype._loadForArticleItem = function (arr) {
    var self = this;
    return this.$context.getStoreData(arr.store)
        .then(function (data) {
            var links = [];
            links.push({
                title: "Секреты Мастеров",
                url: "/article"
            });
            links.push({
                title: data.title
            });
            return links;
        });
};

Breadcrumps.prototype._loadForCompanyItem = function (arr) {
    var self = this;
    return this.$context.getStoreData(arr.store)
        .then(function (data) {
            var links = [];
            links.push({
                title: "Каталог компаний",
                url: "/company"
            });
            links.push({
                title: data.name
            });
            return links;
        });
};

Breadcrumps.prototype._loadForCompanyRubrika = function (arr) {
    var self = this;
    return this.$context.getStoreData(arr.store)
        .then(function (data) {
            var links = [];
            links.push({
                title: "Каталог компаний",
                url: "/company"
            });

            var linksPodrubriks = [];
            data.nearby.forEach(function (el) {
                    if (el.status == 1)
                        linksPodrubriks.push({
                            id: el.id,
                            title: el.name,
                            url: '/company/catalog/' + el.id
                        });
                });
            linksPodrubriks.sort(function (a, b) {
                return a.title > b.title;
            });
            linksPodrubriks = linksPodrubriks.filter(function (el) {
                return el.id != data.id;
            });

            links.push({
                title: data.parent.name,
                url: '/company/catalog/' + data.parent.id,
                links: linksPodrubriks
            });

            links.push({
                title: data.name
            });
            return links;
        });
};

Breadcrumps.prototype._loadForKonkursItem = function (arr) {
    var self = this;
    return this.$context.getStoreData(arr.store)
        .then(function (data) {
            var links = [];
            links.push({
                title: "Конкурсы",
                url: "/konkurs"
            });
            links.push({
                title: data.name
            });
            return links;
        });
};

Breadcrumps.prototype._loadForMasterPage = function () {
    var self = this;
    var data = {};
    return this.$context.getStoreData('master/MasterItem')
        .then(function (res) {
            data = res;
            return self.$context.sendAction('rubrika/RubrikaNearby', 'setID', res.rubrikaID)
        })
        .then(function () {
            return self.$context.getStoreData('rubrika/RubrikaNearby');
        })
        .then(function (res) {
            var link = self._getForRubAndTag({rubrika: res});
            link.push({
                title: res.name,
                url: '/' + res.parent.unique + '/' + res.unique
            });
            link.push({
                title: data.name
            });
            return link;
        });
};

Breadcrumps.prototype._loadForRubrika = function () {
    var self = this;
    return this.$context.getStoreData('Tag')
        .then(function (data) {
            var links;
            if (data.tag.unique) {
                links = self._getForTag(data);
            } else {
                links = self._getForRubrika(data);
            }
            return links;
        });
};

Breadcrumps.prototype._loadForNewsItem = function () {
    var self = this;
    return this.$context.getStoreData('other/NewsItem')
        .then(function (data) {
            var links = [];
            links.push({
                title: "Новости",
                url: "/news"
            });
            links.push({
                title: data.title
            });
            return links;
        });
};

Breadcrumps.prototype._getForTag = function (data) {
    var links = this._getForRubAndTag(data);
    links.push({
        title: data.rubrika.name,
        url: '/' + data.rubrika.parent.unique + '/' + data.rubrika.unique
    });
    links.push({
        title: data.tag.name
    });
    return links;
};

Breadcrumps.prototype._getForRubrika = function (data) {
    var links = this._getForRubAndTag(data);
    links.push({
        title: data.rubrika.name
    });
    return links;
};

Breadcrumps.prototype._getForRubAndTag = function (data) {
    var podrubriks = data.rubrika.nearby;
    var linksPodrubriks = [];
    var links = [];

    Object.keys(podrubriks)
        .forEach(function (num) {
            if (podrubriks[num].status == 1)
                linksPodrubriks.push({
                    title: podrubriks[num].name,
                    url: '/' + data.rubrika.parent.unique + '/' + podrubriks[num].unique
                });
        });
    linksPodrubriks.sort(function (a, b) {
        return a.title > b.title;
    });
    links.push({
        title: "Каталог услуг",
        url: "/catalog"
    });

    links.push({
        title: data.rubrika.parent.name,
        url: "/" + data.rubrika.parent.unique,
        links: linksPodrubriks
    });
    return links;
};

