'use strict';

module.exports = RubrikaCompany;

var util = require('util'),
    StoreBase = require('../../lib/StoreBase');

/**
 * наследуемся от пагинатора для базового стора
 */
util.inherits(RubrikaCompany, StoreBase);

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "rubrika/RubrikaCompany" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function RubrikaCompany($uhr) {
    StoreBase.call(this);

    this._pathBase = '/company/byrubrikacompany/';
    this._path = this._pathBase;
    this._options = {
        data: {
            order: 'sort',
            expand: 'mastersData'
        }
    };
}
/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
RubrikaCompany.prototype.load = function () {
    var self = this;
    var id = this.$context.state.catalog;
    if (!id)
        this.$context.notFound();

    this._path = this._pathBase + id;
    return this._load()
        .then(function (result) {
            var data = {};
            result.content.forEach(function (el) {
                data[el.id] = el;
            });
            return data;
        });
};

