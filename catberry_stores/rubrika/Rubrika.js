'use strict';

module.exports = Rubrika;

var util = require('util'),
    StoreBase = require('../../lib/StoreBase');

/**
 * наследуемся от пагинатора для базового стора
 */
util.inherits(Rubrika, StoreBase);

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
    StoreBase.call(this);

    this._path = '/rubrika';
    this._options = {
        data: {
            filter: '["and", ["=", "unique", ":unique"],["=","status","1"]]',
            expand: "tags,parent,nearby,seo,activeBanners,recomendMasters"
        }
    };
}

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
Rubrika.prototype.load = function () {
    var self = this;
    var rubrika = this.$context.state.rubrika;
    var podrubrika = this.$context.state.podrubrika;

    if (!podrubrika) {
        self.$context.notFound();
    }
    this._optionsData.data.filter[':unique'] = podrubrika;
    return this._load()
        .then(function (result) {
            if (result.content.length == 0)
                self.$context.notFound();

            var data = result.content[0];
            if (data.parentID == 0 || rubrika != data.parent.unique)
                self.$context.notFound();

            if (data.activeBanners) {
                data.activeBanners.forEach(function (item) {
                    item.imgID = JSON.parse(item.imgID);
                });
            }

            data.podrubrika = podrubrika;
            data.rubrika = rubrika;
            return data;
        });
};