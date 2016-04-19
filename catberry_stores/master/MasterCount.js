'use strict';

module.exports = MasterCount;

var util = require('util'),
	StoreBase = require('../../lib/StoreBase');

/**
 * наследуемся от пагинатора для базового стора
 */
util.inherits(MasterCount, StoreBase);

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "master/MasterCount" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function MasterCount() {
	StoreBase.call(this);

	this._path = '/master/active';
	this._options = {
		data: {
			fields: 'id',
			limit: 1
		}
	};
}

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
MasterCount.prototype.$lifetime = 600000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
MasterCount.prototype.load = function () {
	return this._load()
		.then(function (data) {
			return {
				countMaster: data.status.headers['x-pagination-total-count']
			}
		})
};
