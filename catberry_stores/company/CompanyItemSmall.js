'use strict';

module.exports = CompanyItemSmall;

var util = require('util'),
    StoreBase = require('../../lib/StoreBase');

/**
 * наследуемся от базового стора
 */
util.inherits(CompanyItemSmall, StoreBase);


/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "company/CompanyItemSmall" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function CompanyItemSmall() {
    StoreBase.call(this);

    this._id = [];
    this._path = '/company';
    this._options = {
        data: {
            filter: '["and", ["=", "id", ":id"]]',
            expand: 'contacts'
        }
    };
}

CompanyItemSmall.prototype._id = null;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
CompanyItemSmall.prototype.load = function () {
    if (!this._id)
        return null;

    this._optionsData.data.filter[':id'] = this._id;
    return this._load()
        .then(function (data) {
            return data.content[0];
        });
};


CompanyItemSmall.prototype.handleSetID = function (id) {
    this._id = id;
    return true;
};