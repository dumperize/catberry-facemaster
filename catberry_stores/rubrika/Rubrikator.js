'use strict';

module.exports = Rubrikator;

var URL = 'http://api-fm.present-tlt.ru/rubrika/index?filter=%5B%5B%22%3D%22%2C+%22status%22%2C+%221%22%5D%5D&order=sort&limit=200';
/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "rubrika/Rubrikator" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function Rubrikator($uhr) {
    this._uhr = $uhr;
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
Rubrikator.prototype._uhr = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
Rubrikator.prototype.$lifetime = 600000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
Rubrikator.prototype.load = function () {
    return this._uhr.get(URL)
        .then(function (result) {
            if (result.status.code >= 400 && result.status.code < 600) {
                throw new Error(result.status.text);
            }
            var data = result.content;
            var podrubriksTree = {};
            var rootTree = {};

            Object.keys(data)
                .forEach(function (key) {
                    var el = data[key];
                    if (el.parentID == 0) {
                        rootTree[el.sort] = {el: el};
                    } else {
                        if (!podrubriksTree[el.parentID])
                            podrubriksTree[el.parentID] = [];
                        podrubriksTree[el.parentID].push(el);
                    }
                });

            Object.keys(rootTree)
                .forEach(function (key) {
                    podrubriksTree[rootTree[key].el.id].sort(function (a, b) {
                        return a.name > b.name;
                    });
                    rootTree[key].podrubriks = podrubriksTree[rootTree[key].el.id];
                });
            return rootTree;
        });
};

/**
 * Handles action named "some-action" from any component.
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
Rubrikator.prototype.handleSomeAction = function () {
    // Here you can call this.$context.changed() if you know
    // that remote data source has been changed.
    // Also you can have many handle methods for other actions.
};
