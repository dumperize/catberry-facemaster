'use strict';

module.exports = Request;

var util = require('util'),
    StoreBase = require('../lib/StoreBase');

/**
 * наследуемся от пагинатора для базового стора
 */
util.inherits(Request, StoreBase);

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "company/CompanyItem" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function Request($uhr) {
    StoreBase.call(this);
    this._path = '/request/add';
}

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
Request.prototype.load = function () {
};

Request.prototype.handleSend = function (data) {
    return this._uhr.post(this._config.api + this._path, {data: data})
        .then(function (r) {
            if (r.status.code == 422) {
                return {
                    success: false,
                    error: r.content
                }
            } else if (r.status.code != 200) {
                throw new Error(r.status.text);
            } else {
                return {
                    success: true,
                    obj: r.content
                }
            }
        })
};
