'use strict';

module.exports = MasterItemSmall;

var util = require('util'),
    StoreBase = require('../../lib/StoreBase');

/**
 * наследуемся от пагинатора для базового стора
 */
util.inherits(MasterItemSmall, StoreBase);

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
function MasterItemSmall($uhr) {
    StoreBase.call(this);
    this.$context.setDependency('master/MasterPage');

    this._path = '/master';
    this._options = {
        data: {
            filter: '["and", ["=", "id", ":id"],["=","publicStatus", "1"]]',
            expand: 'company'
        }
    };
}

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
MasterItemSmall.prototype.load = function () {
    var self = this;
    return this.$context.getStoreData('master/MasterPage')
        .then(function (page) {
            self._optionsData.data.filter[':id'] = page.masterID;

            return self._load()
                .then(function (result) {
                    if (result.content.length == 0)
                        self.$context.notFound();

                    var data = result.content[0];
                    data.services = JSON.parse(data.services);
                    data.page = page;
                    return data;
                });
        });
};