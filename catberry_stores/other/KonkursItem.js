'use strict';

module.exports = KonkursItem;

var util = require('util'),
	StoreBase = require('../../lib/StoreBase');

util.inherits(KonkursItem, StoreBase);
/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "konkurs/Konkurs" store.
 * @constructor
 */
function KonkursItem() {
	this._api = 'http://konkurs.facemaster.ru';

	StoreBase.call(this);
	this._path = '/konkurs';
	this._options = {
		data: {
			filter: '["and",["=","status",1],["=","id",":id"]]'
		}
	};
}

KonkursItem.prototype.load = function () {
	var id = this.$context.state.item;
	this._optionsData.data.filter[':id'] = id;

	return this._load()
		.then(function (result) {
			if (result.content.length == 0)
				self.$context.notFound();
			return result.content[0];
		})
};