'use strict';

module.exports = RubrikaNearby;

var util = require('util'),
    StoreBase = require('../../lib/StoreBase');

/**
 * наследуемся от базового стора
 */
util.inherits(RubrikaNearby, StoreBase);

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "rubrika/RubrikaNearby" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function RubrikaNearby() {
    StoreBase.call(this);

    this._path = '/rubrika';
    this._options = {
        data: {
            filter: '["and", ["=", "id", ":id"],["=","status","1"]]',
            expand: "nearby,parent"
        }
    };
}
RubrikaNearby.prototype.id = null;
/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
RubrikaNearby.prototype.load = function () {
    var self = this;
    if (!this.id)
        return null;

    this._optionsData.data.filter[':id'] = this.id;

    return this._load()
        .then(function (result) {
            return result.content[0];
        });
};

/**
 * Handles action named "some-action" from any component.
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
RubrikaNearby.prototype.handleSetID = function (id) {
    this.id = id;
    return true;
};
