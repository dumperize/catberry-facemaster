'use strict';

module.exports = KonkursList;

var util = require('util'),
    StoreBase = require('../../lib/StoreBase');

util.inherits(KonkursList, StoreBase);
/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "konkurs/Konkurs" store.
 * @constructor
 */
function KonkursList() {
    this._api = 'http://konkurs.facemaster.ru';

    StoreBase.call(this);
    this._path = '/konkurs';
    this._options = {
        data: {
            filter: '["and",["=","status",1]]',
            expand: 'activeMembers,photos',
            order: 'voteStartDate DESC'
        }
    };
}

KonkursList.prototype.load = function () {
    return this._load()
        .then(function (result) {
            return result.content;
        })
};