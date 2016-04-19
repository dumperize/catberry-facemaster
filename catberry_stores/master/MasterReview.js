'use strict';

module.exports = MasterReview;

var util = require('util'),
    StoreForm = require('../../lib/StoreForm');

/**
 * наследуемся от базового стора
 */
util.inherits(MasterReview, StoreForm);


/**
 * Creates new instance of the "company/CompanyItem" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function MasterReview() {
    StoreForm.call(this);
    this._path = '/master/add-feedback';
}