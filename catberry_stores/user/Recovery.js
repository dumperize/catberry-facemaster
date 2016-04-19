'use strict';

module.exports = Recovery;

var util = require('util'),
	StoreForm = require('../../lib/StoreForm');

/**
 * наследуемся от базового стора
 */
util.inherits(Recovery, StoreForm);


/**
 * Creates new instance of the "user/Auth" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function Recovery() {
	StoreForm.call(this);
	this._path = '/user/recovery';
}
