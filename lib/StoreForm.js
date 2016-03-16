'use strict';

module.exports = StoreForm;

var util = require('util'),
    StoreBase = require('./StoreBase');

/**
 * наследуемся от базового стора
 */
util.inherits(StoreForm, StoreBase);

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
function StoreForm() {
    StoreBase.call(this);
}

StoreForm.prototype._path = null;
StoreForm.prototype.error = null;
StoreForm.prototype.success = false;

StoreForm.prototype.data = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
StoreForm.prototype.$lifetime = 0;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
StoreForm.prototype.load = function () {
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

StoreForm.prototype.handleSend = function (data) {
    this.data = data;
    this.$context.changed();
};
