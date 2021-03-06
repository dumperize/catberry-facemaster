'use strict';

module.exports = MasterPublication;

var dateFormat = require('../../lib/util/DateFormat');
var util = require('util'),
    StoreBase = require('../../lib/StoreBase');

/**
 * наследуемся от базового стора
 */
util.inherits(MasterPublication, StoreBase);

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "master/MasterItem" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function MasterPublication($uhr) {
    StoreBase.call(this);

    this._path = '/master-publication';
    this._options = {
        data: {
            filter: '["and",["=","page","1"], ["=","number", ":number"],["<=", "dateStart", ":dateStart"],[">=", "dateEnd", ":dateEnd"]]'
        }
    };
}

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
MasterPublication.prototype.load = function () {
    var self = this;
    var id = this.$context.state.item;
    if (!id)
        return;

    var now = Date.now();
    now = dateFormat(now, "yyyy-mm-dd");
    this._optionsData.data.filter[':number'] = id;
    this._optionsData.data.filter[':dateStart'] = now;
    this._optionsData.data.filter[':dateEnd'] = now;

    return this._load()
        .then(function (result) {
            if (result.content.length == 0)
                self.$context.notFound();
            return result.content[0];
        })
};
