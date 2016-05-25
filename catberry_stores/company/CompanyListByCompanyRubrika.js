'use strict';

module.exports = CompanyListByCompanyRubrika;

var util = require('util'),
    StoreBase = require('../../lib/StoreBase');

/**
 * наследуемся от пагинатора для базового стора
 */
util.inherits(CompanyListByCompanyRubrika, StoreBase);

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
function CompanyListByCompanyRubrika() {
    StoreBase.call(this);

    this.$context.setDependency('rubrika/RubrikaCompany');
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
CompanyListByCompanyRubrika.prototype.load = function () {
    var self = this;
    var id = this.$context.state.catalog;
    return this.$context.getStoreData('rubrika/RubrikaCompany')
        .then(function (data) {
            if (!data.id)
                self.$context.notFound();
            self._path = self._pathBase + data.id;
            return self._load()
                .then(function (result) {
                    return result.content;
                });
        });
};

