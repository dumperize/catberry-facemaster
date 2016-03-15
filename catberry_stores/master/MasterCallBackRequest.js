'use strict';

module.exports = MasterCallBackRequest;

var util = require('util'),
    StoreBase = require('../../lib/StoreBase');

/**
 * наследуемся от базового стора
 */
util.inherits(MasterCallBackRequest, StoreBase);

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
function MasterCallBackRequest() {
    StoreBase.call(this);
    this._path = '/master/add-callback';
}

MasterCallBackRequest.prototype.error = null;
MasterCallBackRequest.prototype.success = false;

MasterCallBackRequest.prototype.data = null;

MasterCallBackRequest.prototype.$lifetime = 0;
/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
MasterCallBackRequest.prototype.load = function () {
    var self = this;
    if (!this.data)
        return {
            success: false
        };

    return this.send(this._path, {data: this.data})
        .then(function (res) {
            self.data = null;
            return {
                success: res.success,
                error: res.error
            }
        });
};

MasterCallBackRequest.prototype.handleSend = function (data) {
    this.data = data;
    this.$context.changed();
};
