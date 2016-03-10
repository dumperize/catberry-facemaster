'use strict';

module.exports = MasterReview;

var util = require('util'),
    StoreBase = require('../../lib/StoreBase');

/**
 * наследуемся от базового стора
 */
util.inherits(MasterReview, StoreBase);

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "master/MasterReview" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function MasterReview() {
    StoreBase.call(this);
    this._path = '/master/add-feedback';
}

MasterReview.prototype.error = null;
MasterReview.prototype.success = false;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
MasterReview.prototype.load = function () {
    var self = this;
    return {
        success: self.success,
        error: self.error
    }
};

MasterReview.prototype.handleSend = function (data) {
    var self = this;
    return this.send(this._path, {data: data})
        .then(function (res) {
            self.success = res.success;
            self.error = res.error;
            self.$context.changed();
        });
};
