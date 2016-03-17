'use strict';

module.exports = FileUpload;

var util = require('util'),
    StoreBase = require('../lib/StoreBase');

/**
 * наследуемся от базового стора
 */
util.inherits(FileUpload, StoreBase);

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "FileUpload" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function FileUpload() {
    StoreBase.call(this);
    this._path = '/files/upload';
}
FileUpload.prototype._imgData = null;
/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
FileUpload.prototype.load = function () {
    var self = this;

    if (!this._imgData)
        return null;

    return this.send(this._path, {data: this._imgData})
        .then(function (res) {
            self._imgData = null;
            return res.list;
        });
};

FileUpload.prototype.handleSetData = function (data) {
    this._imgData = data;
    return true;
};

