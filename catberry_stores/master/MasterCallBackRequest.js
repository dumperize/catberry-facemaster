'use strict';

module.exports = MasterCallBackRequest;

var util = require('util'),
	StoreBase = require('../../lib/StoreBase');

/**
 * наследуемся от базового стора
 */
util.inherits(MasterCallBackRequest, StoreBase);

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
function MasterCallBackRequest() {
	StoreBase.call(this);
	this._path = '/master/add-callback';
}

MasterCallBackRequest.prototype.error = null;
MasterCallBackRequest.prototype.success = false;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
MasterCallBackRequest.prototype.load = function () {
	var self = this;
	return {
		success: self.success,
		error: self.error
	}
};

MasterCallBackRequest.prototype.handleSend = function (data) {
	var self = this;
	return this.send(this._path, {data: data})
		.then(function (res) {
			self.success = res.success;
			self.error = res.error;
			self.$context.changed();
		});
};
