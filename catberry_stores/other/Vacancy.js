'use strict';

module.exports = Vacancy;

var dateFormat = require('../../lib/util/DateFormat');
var util = require('util'),
    StoreBase = require('../../lib/StoreBase');

/**
 * наследуемся от пагинатора для базового стора
 */
util.inherits(Vacancy, StoreBase);

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "other/vacancy" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function Vacancy($uhr) {
    StoreBase.call(this);

    var now = Date.now();
    now = dateFormat(now, "yyyy-mm-dd");

    this._path = '/about-vacancy';
    this._options = {
        data: {
            filter: '["and",["<=","createDate","' + now + '"],[">=", "endDate", "' + now + '"],["=", "status", "1"]]'
        }
    };
}

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
Vacancy.prototype.load = function () {
    return this._load()
        .then(function (result) {
            return result.content;
        });
};