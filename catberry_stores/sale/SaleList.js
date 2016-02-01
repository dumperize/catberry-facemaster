'use strict';

module.exports = SaleList;

var util = require('util'),
	MasterList = require('../master/MasterList');
/**
 * наследуемся от пагинатора для постраничной навигации
 */
util.inherits(SaleList, MasterList);
/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "master/masterList" store.
 * @param {UHR} $uhr Universal HTTP request.this
 * @constructor
 */
function SaleList($uhr) {
	MasterList.call(this);
	this._pathBase = this._config.api + '/sale';
	this._path = this._pathBase + '/active';
	this._options = {
		data: {
			filter: '["and",["=", "rubrikaID", ""]]',
			expand: 'owner'
		}
	};
}
SaleList.prototype._strucrurResult = function (result) {
	return result;
};