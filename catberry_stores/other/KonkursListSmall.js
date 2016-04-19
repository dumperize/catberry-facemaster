'use strict';

module.exports = KonkursListSmall;

var dateFormat = require('../../lib/util/DateFormat');
var util = require('util'),
    StoreBase = require('../../lib/StoreBase');

util.inherits(KonkursListSmall, StoreBase);
/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "konkurs/Konkurs" store.
 * @constructor
 */
function KonkursListSmall() {
    this._api = 'http://konkurs.facemaster.ru';

    StoreBase.call(this);

    var now = Date.now();
    now = dateFormat(now, "yyyy-mm-dd");

    this._path = '/konkurs';
    this._options = {
        data: {
            filter: '["and",["=","status",1],[">=","receptionEndDate","' + now + '"]]',
            order: 'voteStartDate DESC'
        }
    };
}

KonkursListSmall.prototype.load = function () {
    return this._load()
        .then(function (result) {
            return result.content;
        })
};