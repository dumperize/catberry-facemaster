'use strict';

module.exports = RubrikatorCompany;

var util = require('util'),
		Rubrikator = require('./Rubrikator');

util.inherits(RubrikatorCompany, Rubrikator);

function RubrikatorCompany() {
	Rubrikator.call(this);
	this._path = 'http://api-fm.present-tlt.ru/rubrika-company';
	this._options = {
		data: {
			filter: '[["=", "status", "1"]]',
			order: 'sort',
			limit: 200
		}
	};
}