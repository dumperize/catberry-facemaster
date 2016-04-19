'use strict';


module.exports = VacancyItem;

var dateFormat = require('../../lib/util/DateFormat');
var util = require('util'),
    StoreBase = require('../../lib/StoreBase');

/**
 * наследуемся от пагинатора для базового стора
 */
util.inherits(VacancyItem, StoreBase);

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "other/vacancyItem" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function VacancyItem($uhr) {
    StoreBase.call(this);

    var now = Date.now();
    now = dateFormat(now, "yyyy-mm-dd");

    this._path = '/about-vacancy';
    this._options = {
        data: {
            filter: '["and",["=", "id", ":id"],["<=","createDate","' + now + '"],[">=", "endDate", "' + now + '"],["=", "status", "1"]]'
        }
    };
}

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
VacancyItem.prototype.load = function () {
    var self = this;
    var id = this.$context.state.item;
    if (!id)
        return;

    this._optionsData.data.filter[':id'] = id;
    return this._load()
        .then(function (result) {
            if (result.content.length == 0)
                self.$context.notFound();

            return result.content[0];
        });
};