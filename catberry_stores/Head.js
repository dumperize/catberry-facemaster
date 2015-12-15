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
    return this.$context.getStoreData('Pages')
        .then(function (page) {
            if (page.current == "rubrika")
                return self._loadForRubrika();

            var data = PAGES[page.current];
            return {
                title: data.title + '. FaceMaster.ru. Специалисты Тольятти',
                description: data.description,
                keywords: data.keywords
            }
        });
};

Head.prototype._loadForRubrika = function () {
    return this.$context.getStoreData('Tag')
        .then(function (data) {
            return {
                title: data.currentSeo.headTitle,
                description: data.currentSeo.description,
                keywords: data.currentSeo.keywords
            }
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
