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
        return this.$context.getStoreData('rubrika/Rubrikator')
            .then(function (data) {
                var currentRubrika = self.$context.state.rubrika;
                var currentPodrubrika = self.$context.state.podrubrika;
                var podrubriks = data[currentRubrika]['podrubriks'];
                var linksPodrubriks = [];
                var links = [
                    {
                        title: "Каталог услуг",
                        url: "catalog"
                    }
                ];
                var leaf;

                Object.keys(podrubriks)
                    .forEach(function (num) {
                        if (currentPodrubrika == podrubriks[num].nameEN) {
                            leaf = podrubriks[num].name;
                            return;
                        }
                        linksPodrubriks.push({
                            title: podrubriks[num].name,
                            url: '/' + data[currentRubrika]["nameEN"] + '/' + podrubriks[num].nameEN
                        });
                    });

                links.push({
                    title: data[currentRubrika]["name"],
                    url: "/" + data[currentRubrika]["nameEN"],
                    links: linksPodrubriks
                });
                links.push({
                    title: leaf
                });

                return {
                    links: links
                };

            });
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
