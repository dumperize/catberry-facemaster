'use strict';

module.exports = KonkursMember;

var util = require('util'),
    StoreBase = require('../../lib/StoreBase');

util.inherits(KonkursMember, StoreBase);
/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "konkurs/Konkurs" store.
 * @constructor
 */
function KonkursMember() {
    this._api = 'http://konkurs.facemaster.ru';

    StoreBase.call(this);
    this._path = '/member';
    this._options = {
        data: {
            filter: '["and",["=","konkursID",":id"],["=","status",2]]',
            expand: 'photos,countHits',
            limit: 200
        }
    };
    this.$context.setDependency('other/KonkursItem');
}

KonkursMember.prototype.load = function () {
    var self = this;
    return this.$context.getStoreData('other/KonkursItem')
        .then(function (data) {
            return data.id;
        })
        .then(function (id) {
            self._optionsData.data.filter[':id'] = id;
            return self._load()
                .then(function (result) {
                    return result.content;
                })
        })

};

KonkursMember.prototype.handleVote = function (data) {
    var self = this;
    return this.$context.sendAction('other/KonkursVote', 'setData', data)
        .then(function (data) {
            return self.$context.getStoreData('other/KonkursVote');
        })
};