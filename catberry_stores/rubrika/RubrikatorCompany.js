'use strict';

module.exports = RubrikatorCompany;

var util = require('util'),
    Rubrikator = require('./Rubrikator');

util.inherits(RubrikatorCompany, Rubrikator);

function RubrikatorCompany($uhr) {
    Rubrikator.call(this);

    this._path = '/rubrika-company';
    this._options = {
        data: {
            filter: '["and",["=", "status", "1"]]',
            order: 'sort',
            expand: "companyCount",
            limit: 200
        }
    };
    this._countName = "companyCount";
}
