'use strict';

module.exports = MasterSovety;

var util = require('util'),
		StorePaginator = require('../../lib/StorePaginator');

util.inherits(MasterSovety, StorePaginator);

function MasterSovety() {
	StorePaginator.call(this);
	this._path = 'http://api-fm.present-tlt.ru/article/active';
	this._options = {
		data: {
			order: 'id DESC'
		}
	};
	this._url = "/sovety/page/";
	this._catalog = this.$context.state.catalog;
	if (this._catalog) {
		this._options.data.filter = '[["=","rubrikaID","' + this._catalog + '"]]';
		this._url = "/sovety/catalog/" + this._catalog + "/page/";
	}
}