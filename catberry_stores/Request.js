'use strict';

module.exports = Request;

var util = require('util'),
    StoreForm = require('../lib/StoreForm');

/**
 * наследуемся от пагинатора для базового стора
 */
util.inherits(Request, StoreForm);

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
function Request() {
    StoreForm.call(this);
    this._path = '/request/add';
}