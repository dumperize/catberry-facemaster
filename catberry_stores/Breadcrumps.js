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

    if (this.$context.state.page) {
        var leaf = PAGES[this.$context.state.page].title;
        return {
            links: [
                {
                    title: leaf
                }
            ]
        }
    }

    if (this.$context.state.rubrika) {
        var self = this;
        return this.$context.getStoreData('rubrika/Rubrika')
            .then(function (data) {
                var currentRubrika = self.$context.state.rubrika;
                var currentPodrubrika = self.$context.state.podrubrika;
                var podrubriks = data.nearby;
                var linksPodrubriks = [];
                var links = [];

                Object.keys(podrubriks)
                    .forEach(function (num) {
                        linksPodrubriks.push({
                            title: podrubriks[num].name,
                            url: '/' + data.parent.english + '/' + podrubriks[num].english
                        });
                    });

                links.push({
                    title: "Каталог услуг",
                    url: "catalog"
                });

                links.push({
                    title: data.parent.name,
                    url: "/" + data.parent.english,
                    links: linksPodrubriks
                });

                if (self.$context.state.tag) {
                    links.push({
                        title: data.name,
                        url: '/' + data.parent.english + '/' + data.english
                    });
                    links.push({
                        title: self.getNameTag(self.$context.state.tag, data.tags)
                    });
                } else {
                    links.push({
                        title: data.name
                    });
                }

                return {
                    links: links
                };

            });
    }
    return null;
};

Breadcrumps.prototype.getNameTag = function (tag, data) {
    for (var i = 0; i < data.length; ++i) {
        if (data[i].url == tag)
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
