'use strict';

module.exports = MasterCallBackRequest;

var util = require('util'),
    StoreForm = require('../../lib/StoreForm');

/**
 * наследуемся от базового стора
 */
util.inherits(MasterCallBackRequest, StoreForm);


/**
 * Creates new instance of the "company/CompanyItem" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function MasterCallBackRequest() {
    StoreForm.call(this);
    this._path = '/master/add-callback';
}
