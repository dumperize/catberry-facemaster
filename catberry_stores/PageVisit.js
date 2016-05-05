'use strict';

module.exports = PageVisit;

var util = require('util'),
    StoreBase = require('../lib/StoreBase');

/**
 * наследуемся от пагинатора для базового стора
 */
util.inherits(PageVisit, StoreBase);

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "article/ArticleItem" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function PageVisit() {
    StoreBase.call(this);

    this._api = 'http://stat.facemaster.ru';
    this._path = '/response/get-visits';
}

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
PageVisit.prototype.load = function () {
    return this._load()
        .then(function (data) {
            return data.content;
        });
};