'use strict';

module.exports = CompanyItem;

var util = require('util'),
    StoreBase = require('../../lib/StoreBase');

/**
 * наследуемся от пагинатора для базового стора
 */
util.inherits(CompanyItem, StoreBase);

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
function CompanyItem($uhr) {
    StoreBase.call(this);

    this._path = '/company';
    this._options = {
        data: {
            filter: '["and", ["=","number", ":number"]]',
            expand: "master,mastersData,videos,albums,contacts,schedule,workCondition"
        }
    };
}

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
CompanyItem.prototype.load = function () {
    var self = this;
    var id = this.$context.state.id;
    if (!id)
        return;

    this._optionsData.data.filter[':number'] = id;
    return this._load()
        .then(function (result) {
            if (result.content.length == 0 || result.content[0].mastersData.count_masters == 0)
                self.$context.notFound();
            return result.content[0];
        });
};

