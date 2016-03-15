'use strict';

module.exports = Recovery;

var util = require('util'),
	StoreBase = require('../../lib/StoreBase');

/**
 * наследуемся от базового стора
 */
util.inherits(Recovery, StoreBase);

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "user/Recovery" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function Recovery() {
	StoreBase.call(this);
	this._path = '/user/recovery';
}

Recovery.prototype.error = null;
Recovery.prototype.success = false;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
Recovery.prototype.load = function () {
	var self = this;
	return {
		success: self.success,
		error: self.error
	}
};

Recovery.prototype.handleSend = function (data) {
	var self = this;
	return this.send(this._path, {data: data})
		.then(function (res) {
			self.success = res.success;
			self.error = res.error;
			//self.$context.changed();
		});
};
