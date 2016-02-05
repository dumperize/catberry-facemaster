'use strict';

module.exports = NewsItem;

var util = require('util'),
    StoreBase = require('../../lib/StoreBase');

/**
 * наследуемся от пагинатора для базового стора
 */
util.inherits(NewsItem, StoreBase);

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "other/NewsItem" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function NewsItem($uhr) {
    StoreBase.call(this);

    this._path = '/about-news';
    this._options = {
        data: {
            filter: '["and",["=","id",":id"],["=", "status", "1"]]'
        }
    };
}

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
NewsItem.prototype.load = function () {
    var self = this;
    var item = this.$context.state.item;
    if (!item)
        return;

    this._optionsData.data.filter[':id'] = item;

    return this._load()
        .then(function (result) {
            if (result.content.length == 0)
                self.$context.notFound();

            return result.content[0];
        });
};