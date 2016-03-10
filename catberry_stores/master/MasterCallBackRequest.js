'use strict';

module.exports = Request;

var util = require('util'),
	StoreBase = require('../../lib/StoreBase');

/**
 * наследуемся от базового стора
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
	this._path = '/master/add-callback';
}

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
Request.prototype.load = function () {
};

Request.prototype.handleSend = function (data) {
	console.log(typeof data);
	return this.send(this._path, {data: data})
		.then(function(res){
			console.log(res);
			return res;
		});
};
