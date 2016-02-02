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

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
Pages.prototype.load = function () {
    var self = this;
    var currentPage = self.$context.state.page;

    return Promise.resolve(1)
        .then(function () {
            if (currentPage == "master-rubrika")
                return self.$context.getStoreData('Tag');
            if (currentPage == "master-page")
                return self.$context.getStoreData('master/MasterItem');
            if (currentPage == "news-item")
                return self.$context.getStoreData('other/NewsItem');
            if (currentPage == "vacancy-item")
                return self.$context.getStoreData('other/VacancyItem');
            if (currentPage == "video")
                return self.$context.getStoreData('rubrika/RubrikatorVideo');
            if (currentPage == "sale")
                return self.$context.getStoreData('rubrika/RubrikatorSale');
            if (currentPage == "article")
                return self.$context.getStoreData('rubrika/RubrikatorArticle');
            if (currentPage == "company-rubrika")
                return self.$context.getStoreData('rubrika/RubrikaCompany');
            if (currentPage == "article-item")
                return self.$context.getStoreData('article/ArticleItem');
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