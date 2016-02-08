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
            filter: '["and",[":simbol","id",":id"],["=", "status", "1"]]',
            order: 'date :direction',
            limit: 1
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
    this._optionsData.data.filter[':simbol'] = '=';
    self._optionsData.data.order[':direction'] = 'desc';

    return this._load()
        .then(function (result) {
            if (result.content.length == 0)
                self.$context.notFound();

            return result.content[0];
        })
        .then(function (data) {
            self._optionsData.data.filter[':simbol'] = '<';
            var promise1 = self._load();

            self._optionsData.data.filter[':simbol'] = '>';
            self._optionsData.data.order[':direction'] = 'asc';
            var promise2 = self._load();

            return Promise.all([promise1, promise2])
                .then(function (nextPrev) {
                    data.prev = nextPrev[0].content[0];
                    data.next = nextPrev[1].content[0];
                    return data;
                });
        });
};