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
    return {};
    //return this.$context.getStoreData('Pages')
    //    .then(function (page) {
    //
    //        if (page.state.rubrika)
    //            return self._loadForRubrika();
    //
    //        brcrmp.push({
    //            title: PAGES[page.state.page].title
    //        });
    //
    //        return brcrmp;
    //    })
    //    .then(function (brcrmp) {
    //        return {
    //            links: brcrmp
    //        };
    //    });
};

Breadcrumps.prototype._loadForRubrika = function () {
    var self = this;
    return this.$context.getStoreData('rubrika/Rubrika')
        .then(function (rubrika) {
            var links;
            if (rubrika.currentSeo.state.tag) {
                links = self._getForTag(rubrika);
            } else {
                links = self._getForRubrika(rubrika);
            }
            return links;
        });
};

Breadcrumps.prototype._getForTag = function (rubrika) {
    var links = this._getForRubAndTag(rubrika);
    links.push({
        title: rubrika.name,
        url: '/' + rubrika.parent.unique + '/' + rubrika.unique
    });
    links.push({
        title: this._getNameTag(rubrika.currentSeo.state.tag, rubrika.tags)
    });
    return links;
};

Breadcrumps.prototype._getForRubrika = function (rubrika) {
    var links = this._getForRubAndTag(rubrika);
    links.push({
        title: rubrika.name
    });
    return links;
};

Breadcrumps.prototype._getForRubAndTag = function (data) {
    var podrubriks = data.nearby;
    var linksPodrubriks = [];
    var links = [];

    Object.keys(podrubriks)
        .forEach(function (num) {
            linksPodrubriks.push({
                title: podrubriks[num].name,
                url: '/' + data.parent.unique + '/' + podrubriks[num].unique
            });
        });

    links.push({
        title: "Каталог услуг",
        url: "/catalog"
    });

    links.push({
        title: data.parent.name,
        url: "/" + data.parent.unique,
        links: linksPodrubriks
    });
    return links;
};

Breadcrumps.prototype._getNameTag = function (tag, data) {
    for (var i = 0; i < data.length; ++i) {
        if (data[i].unique == tag)
            return data[i].name;
    }
    return null;
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
