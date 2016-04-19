'use strict';

module.exports = RubrikatorParent;

var RubrikaFormat = require('../../lib/util/RubrikaFormat');
var util = require('util'),
    StoreBase = require('../../lib/StoreBase');

/**
 * наследуемся от пагинатора для базового стора
 */
util.inherits(RubrikatorParent, StoreBase);
/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "rubrika/RubrikatorParent" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function RubrikatorParent($uhr) {
    this._path = '/rubrika';
    this._options = {
        data: {
            filter: '["and",["=", "parentID", "0"]]',
            order: 'name',
            limit: 200
        }
    };
}

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
RubrikatorParent.prototype.load = function () {
    return this._load()
        .then(function (result) {
            return result.content;
        });
};
