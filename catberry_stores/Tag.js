'use strict';

module.exports = Tag;

var util = require('util'),
    StoreBase = require('../lib/StoreBase');

/**
 * наследуемся от пагинатора для базового стора
 */
util.inherits(Tag, StoreBase);

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
    StoreBase.call(this);
    this.$context.setDependency('rubrika/Rubrika');
    this._path = '/tag';
    this._options = {
        data: {
            filter: '["and",["=", "unique", ":unique"],["=","status","1"]]',
            expand: 'seo'
        }
    };
}

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
                self._optionsData.data.filter[':unique'] = tag;
                return self._load()
                    .then(function (data) {
                        return data.content[0];
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