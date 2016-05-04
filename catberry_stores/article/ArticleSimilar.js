'use strict';

module.exports = ArticleSimilar;

var util = require('util'),
    StoreBase = require('../../lib/StoreBase');

/**
 * наследуемся от пагинатора для базового стора
 */
util.inherits(ArticleSimilar, StoreBase);

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
function ArticleSimilar($uhr) {
    StoreBase.call(this);
    this.$context.setDependency('article/ArticleItem');

    this._pathBase = '/article/byrubrika/';
    this._options = {
        data: {
            expand: "owner",
            order: "date DESC",
            limit: 20
        }
    };
}

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
ArticleSimilar.prototype.load = function () {
    var self = this;
    var currentArticle;


    return this.$context.getStoreData('article/ArticleItem')
        .then(function (data) {
            currentArticle = data;
            //self._optionsData.data.filter[':id'] = data.id;
            self._path = self._pathBase + currentArticle.owner.rubrikaID;
            return self._load();
        })
        .then(function (result) {
            var r = result.content.filter(function (el) {
                return el.id != currentArticle.id;
            });
            r.sort(function (a, b) {
                return Math.random() - 0.5;
            });
            return r.slice(0, 5);
        });
};

