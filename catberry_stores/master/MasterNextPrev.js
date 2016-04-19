'use strict';

module.exports = MasterNextPrev;

var util = require('util'),
    StoreBase = require('../../lib/StoreBase');

/**
 * наследуемся от пагинатора для базового стора
 */
util.inherits(MasterNextPrev, StoreBase);

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "master/MasterNextPrev" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function MasterNextPrev($uhr) {
    StoreBase.call(this);

    this.$context.setDependency('master/MasterItem');
    this._path = '/master/active';
    this._options = {
        data: {
            filter: '["and", [":letter","sort", ":sort"],["=", "rubrikaID", ":rubrikaID"]]',
            limit: 1,
            order: 'sort :direction'
        }
    };
}

MasterNextPrev.prototype.load = function () {
    var self = this;
    return this.$context.getStoreData('master/MasterItem')
        .then(function (master) {
            self._optionsData.data.filter[':sort'] = master.sort;
            self._optionsData.data.filter[':rubrikaID'] = master.rubrikaID;
            self._optionsData.data.filter[':letter'] = '>';
            self._optionsData.data.order[':direction'] = 'ASC';
            var promise1 = self._load();
            self._optionsData.data.filter[':letter'] = '<';
            self._optionsData.data.order[':direction'] = 'DESC';
            var promise2 = self._load();
            return Promise.all([promise1, promise2])
                .then(function (data) {
                    return {
                        prev: data[1].content[0] && data[1].content[0].page ? data[1].content[0] : null,
                        next: data[0].content[0] && data[0].content[0].page ? data[0].content[0] : null
                    }
                })
        });

};