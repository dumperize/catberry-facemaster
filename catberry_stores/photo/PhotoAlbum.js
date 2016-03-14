'use strict';

module.exports = PhotoAlbum;

var util = require('util'),
    StoreBase = require('../../lib/StoreBase');

/**
 * наследуемся от базового стора
 */
util.inherits(PhotoAlbum, StoreBase);

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "master/MasterItem" store.
 * @constructor
 */
function PhotoAlbum() {
    StoreBase.call(this);

    this._listID = [];
    this._path = '/album';
    this._options = {
        data: {
            filter: '["and", ["IN", "id", [:listID]],["=","status", "1"]]',
            expand: 'photos'
        }
    };
}

PhotoAlbum.prototype._listID = null;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
PhotoAlbum.prototype.load = function () {
    if (!this._listID)
        return null;

    this._optionsData.data.filter[':listID'] = this._listID.join(',');
    return this._load()
        .then(function (data) {
            return data.content;
        });
};

PhotoAlbum.prototype.handleSetListID = function (list) {
    this._listID = list;
    return true;
};