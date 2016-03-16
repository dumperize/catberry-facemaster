'use strict';

module.exports = Auth;

var util = require('util'),
    StoreForm = require('../../lib/StoreForm');

/**
 * наследуемся от базового стора
 */
util.inherits(Auth, StoreForm);


/**
 * Creates new instance of the "user/Auth" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function Auth() {
    StoreForm.call(this);
    this._path = '/auth';
}
