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
    var isPageRubrika = false;

    return Promise.resolve(null)
        .then(function () {
            var rubrika = self.$context.state.rubrika;

            if (rubrika) {
                currentPage = rubrika;
                isPageRubrika = true;
                return self.$context.getStoreData('rubrika/Rubrikator')
                    .then(function (rubriks) {
                        Object.keys(rubriks)
                            .forEach(function (num) {
                                PAGES[rubriks[num]['nameEN']] = rubriks[num]['name'];
                            });
                        return PAGES;
                    });
            }

            return;
        })
        .then(function () {

            if (!currentPage) {
                return self.$context.redirect('/main');
            }

            if (!PAGES.hasOwnProperty(currentPage)) {
                throw new Error(currentPage + ' page not found');
            }

            var result = {
                current: currentPage,
                isActive: {},
                pageState: self.$context.state,

                header: self.getHeaderData(),
                footer: self.getFooterData()
            };
            Object.keys(PAGES)
                .forEach(function (page) {
                    result.isActive[page] = (currentPage === page);
                });
            result.isActive['masterRubrika'] = isPageRubrika;

            return result;
        });
}

Pages.prototype.getHeaderData = function () {
    return {
        visitCount: '12 323 посещений',
        isGuest: true
    };
}

Pages.prototype.getFooterData = function () {
    return {
        phone: '(8482) 74-44-19'
    };
}