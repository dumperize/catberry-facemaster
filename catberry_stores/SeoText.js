'use strict';

module.exports = SeoText;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "seoText" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function SeoText($uhr) {
    this._uhr = $uhr;
    this._podrubrika;
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
SeoText.prototype._uhr = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
SeoText.prototype.$lifetime = 60000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
SeoText.prototype.load = function () {
    var self = this;
    var section = this.$context.state.section || 'master';
    var tag = this.$context.state.tag || '';

    return Promise.resolve(self)
        .then(function () {
            if (!tag) {
                return self.getCurrentSeo(self._podrubrika, section);
            } else {
                var path = 'http://api-fm.present-tlt.ru/tag/index?filter=%5B%5B%22%3D%22%2C%22unique%22%2C%22' + tag + '%22%5D%5D&expand=seo';
                return self._uhr.get(path)
                    .then(function (result) {
                        if (result.status.code >= 400 && result.status.code < 600) {
                            throw new Error(result.status.text);
                        }
                        return self.getCurrentSeo(result.content[0], section);
                    });
            }
        })
        .then(function (currentSeo) {
            currentSeo.state = {
                //podrubrika: podrubrika,
                tag: self.$context.state.tag,
                section: section
            };
            return currentSeo;
        });
};

SeoText.prototype.handleSetPodrubrikaSeo = function (seo) {
    this._podrubrika = seo;
    this.$context.changed();
};
/**
 * Handles action named "some-action" from any component.
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
SeoText.prototype.handleSomeAction = function () {
    // Here you can call this.$context.changed() if you know
    // that remote data source has been changed.
    // Also you can have many handle methods for other actions.
};

SeoText.prototype.getCurrentSeo = function (data, section) {
    var result;
    var seo = data.seo;

    Object.keys(seo)
        .forEach(function (key) {
            if (section == seo[key].section)
                result = seo[key];
        });
    if (!result)
        return {
            headTitle: data.name,
            pageTitle: data.name
        };
    return result;
};
