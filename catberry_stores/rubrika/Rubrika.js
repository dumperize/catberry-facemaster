'use strict';

module.exports = Rubrika;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "rubrika/Rubrika" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function Rubrika($uhr) {
    this._uhr = $uhr;
    this.$context.setDependency('SeoText');
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
Rubrika.prototype._uhr = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
Rubrika.prototype.$lifetime = 60000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
Rubrika.prototype.load = function () {
    var self = this;
    var podrubrika = this.$context.state.podrubrika;

    if (!podrubrika) {
        return;
    }
    var url = 'http://api-fm.present-tlt.ru/rubrika/index?filter=%5B%5B%22%3D%22%2C%22unique%22%2C%22' + podrubrika + '%22%5D%5D&expand=tags,parent,nearby,seo';
    return this._uhr.get(url)
        .then(function (result) {
            if (result.status.code >= 400 && result.status.code < 600) {
                throw new Error(result.status.text);
            }
            var data = result.content[0];
            data.state = self.$context.state;

            self.$context.sendAction('SeoText', 'setPodrubrikaSeo', {
                id: data.id,
                name: data.name,
                seo: data.seo
            });
            return self.$context.getStoreData('SeoText')
                .then(function (seo) {
                    data.currentSeo = seo;
                    return data;
                });
        });
};

/**
 * Handles action named "some-action" from any component.
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */

Rubrika.prototype.handleGetCurrentPodrubrika = function () {
    return this.$context.state.podrubrika;
}