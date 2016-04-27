'use strict';

module.exports = KonkursVote;

var util = require('util'),
    StoreForm = require('../../lib/StoreForm');

/**
 * наследуемся от базового стора
 */
util.inherits(KonkursVote, StoreForm);

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "other/KonkursVote" store.
 * @constructor
 */
function KonkursVote() {
    this._api = 'http://konkurs.facemaster.ru';

    StoreForm.call(this);
    this._path = '/vote/hit';
}
KonkursVote.prototype.data = null;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
KonkursVote.prototype.load = function () {
    if (!this.data)
        return null;

    return this.send(this._path, {data: this.data});
};

/**
 * Handles action named "some-action" from any component.
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
KonkursVote.prototype.handleSetData = function (data) {
    this.data = data;
};
