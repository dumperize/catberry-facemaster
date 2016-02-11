'use strict';

var PAGES = require("../config/pages.json");

module.exports = Pages;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "Pages" store.
 * @param {Object} $config Application config.
 * @constructor
 */
function Pages($config) {
    this._config = $config;
    this.$context.setDependency('Tag');
    this.$context.setDependency('rubrika/RubrikatorVideo');
    this.$context.setDependency('rubrika/RubrikatorSale');
    this.$context.setDependency('rubrika/RubrikatorArticle');
    this.$context.setDependency('rubrika/RubrikaCompany');

    this._loodStore = {
        'article': 'article/ArticleByRubrika',
        'article-item': 'article/ArticleItem',
        'catalog': '',
        'company': '',
        'company-page': 'company/CompanyItem',
        'company-rubrika': 'rubrika/RubrikaCompany',
        'contact': '',
        'feedback': '',
        'login': '',
        'main': '',
        'master-page': 'master/MasterItem',
        'master-print-card': 'master/MasterItemSmall',
        'master-rubrika': 'Tag',
        'news': 'other/News',
        'news-item': 'other/NewsItem',
        'oferta': '',
        'recommendation': 'other/Recommendation',
        'registration': '',
        'request': '',
        'sale': 'sale/SaleByRubrika',
        'vacancy': 'other/Vacancy',
        'vacancy-item': 'other/VacancyItem',
        'video': 'video/VideoByRubrika'
    }
}

/**
 * Current application config.
 * @type {Object}
 * @private
 */
Pages.prototype._config = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
Pages.prototype.$lifetime = 3600000;

Pages.prototype._loodStore = {};

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
Pages.prototype.load = function () {
    var self = this;
    var currentPage = self.$context.state.page;

    return Promise.resolve(1)
        .then(function () {
            if (self._loodStore[currentPage])
                return self.$context.getStoreData(self._loodStore[currentPage]);
        })
        .then(function () {
            if (!currentPage) {
                return self.$context.redirect('/main');
            }

            if (!PAGES.hasOwnProperty(currentPage)) {
                self.$context.notFound();
            }

            var result = {
                current: currentPage,
                currentStore: self._loodStore[currentPage],
                isActive: {},

                header: self.getHeaderData(),
                footer: self.getFooterData()
            };
            Object.keys(PAGES)
                .forEach(function (page) {
                    result.isActive[page] = (currentPage === page);
                });
            return result;
        });
};

Pages.prototype.getHeaderData = function () {
    var self = this;
    return this.getSpecialClass()
        .then(function (specClass) {
            return {
                class: specClass,
                visitCount: '12 323 посещений',
                isGuest: true,
                clear: self.getClear()
            };
        });
};

Pages.prototype.getFooterData = function () {
    return {
        phone: '(8482) 74-44-19',
        clear: this.getClear()
    };
};

/**
 * Указывает на каких страницах не должно быть шапки и футера
 * @returns {boolean}
 */
Pages.prototype.getClear = function () {
    return (this.$context.state.page == 'master-print-card');
};

/**
 * Указывает на каких страницах должен быть прописан специальный класс в шапке
 * @returns {*}
 */
Pages.prototype.getSpecialClass = function () {
    if (this.$context.state.page == 'master-rubrika') {
        return this.$context.getStoreData(this._loodStore['master-rubrika'])
            .then(function (data) {
                var haveTopBanner = data.rubrika.activeBanners.some(function (banner) {
                    return (banner.type == 1);
                });
                return haveTopBanner ? 'moneyr' : '';
            });
    }
    return Promise.resolve();
};