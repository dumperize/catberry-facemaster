'use strict';

module.exports = Tag;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "tag" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function Tag($uhr) {
    this._uhr = $uhr;
    this.$context.setDependency('rubrika/Rubrika');
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
Tag.prototype._uhr = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
Tag.prototype.$lifetime = 60000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
Tag.prototype.load = function () {
    var self = this;
    var section = this.$context.state.section || 'master';
    var tag = this.$context.state.tag || '';
    var data = {};

    return this.$context.getStoreData("rubrika/Rubrika")
        .then(function (rubrika) {
            data.rubrika = rubrika;
        })
        .then(function () {
            if (tag) {
                var path = 'http://api-fm.present-tlt.ru/tag';
                var option = {
                    data: {
                        filter: '["and",["=", "unique", "' + tag + '"]]',
                        expand: 'seo'
                    }
                };
                return self._uhr.get(path, option)
                    .then(function (result) {
                        if (result.status.code >= 400 && result.status.code < 600) {
                            throw new Error(result.status.text);
                        }
                        return result.content[0];
                    });
            }

            return {};
        })
        .then(function (tagData) {
            if (tag && tagData == {})
                self.$context.notFound();

            data.tag = tagData;
            data.section = section;
            data.currentSeo = tag ? self._getCurrentSeo(data.tag, data.section) : self._getCurrentSeo(data.rubrika, data.section);
            return data;
        });
};

/**
 * Handles action named "some-action" from any component.
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
Tag.prototype.handleSomeAction = function () {
    // Here you can call this.$context.changed() if you know
    // that remote data source has been changed.
    // Also you can have many handle methods for other actions.
};

Tag.prototype._getCurrentSeo = function (data, section) {
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