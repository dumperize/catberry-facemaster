'use strict';

module.exports = ArticleItem;

var util = require('util'),
    StoreBase = require('../../lib/StoreBase');

/**
 * наследуемся от пагинатора для базового стора
 */
util.inherits(ArticleItem, StoreBase);

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
function ArticleItem($uhr) {
    StoreBase.call(this);
    this._path = '/article';
    this._options = {
        data: {
            expand: 'owner',
            filter: '["and",["=","status","1"],["=","id",":id"]]'
        }
    };
}

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
ArticleItem.prototype.load = function () {
    var self = this;
    var id = this.$context.state.id;
    var masterID = this.$context.state.masterID;

    if (!id || !masterID)
        this.$context.notFound();

    this._optionsData.data.filter[':id'] = id;
    return this._load()
        .then(function (result) {
            if ((result.content.length == 0) || (result.content[0].owner.page.masterID != masterID))
                self.$context.notFound();
            return result.content[0];
        });
};

