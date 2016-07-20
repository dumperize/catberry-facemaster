'use strict';

module.exports = SearchFacets;

var util = require('util'),
    StoreBase = require('../../lib/StoreBase');

/**
 * наследуемся от пагинатора для базового стора
 */
util.inherits(SearchFacets, StoreBase);

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
function SearchFacets() {
    StoreBase.call(this);
    this._path = '/search/facets';
    this._options = {
        data: {}
    };
}


SearchFacets.prototype.load = function (page) {
    var self = this;
    try {
        this._options.data['query'] = this.$context.location.query.values.query;
    } catch (e) {
    }
    return this._load()
        .then(function (result) {
            return result.content;
        })
};
