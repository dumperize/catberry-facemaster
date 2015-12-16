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
    var brcrmp = [];
    return this.$context.getStoreData('Pages')
        .then(function (page) {
            if (page.current == "master-rubrika")
                return self._loadForRubrika();

            brcrmp.push({
                title: PAGES[page.current].title
            });
            return brcrmp;
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
            linksPodrubriks.push({
                title: podrubriks[num].name,
                url: '/' + data.rubrika.parent.unique + '/' + podrubriks[num].unique
            });
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

/**
 * Handles action named "some-action" from any component.
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
Breadcrumps.prototype.handleSomeAction = function () {
    // Here you can call this.$context.changed() if you know
    // that remote data source has been changed.
    // Also you can have many handle methods for other actions.
};
