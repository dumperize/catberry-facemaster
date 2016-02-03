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
        'master-rubrika': 'Tag',
        'master-page': 'master/MasterItem',
        'news-item': 'other/NewsItem',
        'vacancy-item': 'other/VacancyItem',
        'video': 'rubrika/RubrikatorVideo',
        'sale': 'rubrika/RubrikatorSale',
        'article': 'rubrika/RubrikatorArticle',
        'company-rubrika': 'rubrika/RubrikaCompany',
        'article-item': 'article/ArticleItem'
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
    return {
        visitCount: '12 323 посещений',
        isGuest: true
    };
};

Pages.prototype.getFooterData = function () {
    return {
        phone: '(8482) 74-44-19'
    };
};