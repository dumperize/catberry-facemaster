'use strict';

module.exports = MasterInAnotherRubrika;

var util = require('util'),
    StoreBase = require('../../lib/StoreBase');

/**
 * наследуемся от базового стора
 */
util.inherits(MasterInAnotherRubrika, StoreBase);

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "master/MasterItem" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function MasterInAnotherRubrika($uhr) {
    StoreBase.call(this);

    this.$context.setDependency('master/MasterItem');
    this._path = '/master/active';
    this._options = {
        data: {
            filter: '["and", ["=", "name", ":name"]]',
            expand: 'rubrika'
        }
    };
}

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
MasterInAnotherRubrika.prototype.load = function () {
    var self = this;
    var master;
    return this.$context.getStoreData('master/MasterItem')
        .then(function (data) {
            master = data;
            self._optionsData.data.filter[':name'] = master.name;
            return self._load();
        })
        .then(function (data) {
            return data.content.filter(function (el) {
                return el.id != master.id;
            });
        })
};
