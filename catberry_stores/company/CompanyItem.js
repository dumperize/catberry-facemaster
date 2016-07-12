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
function CompanyItem(locator) {
    StoreBase.call(this);
    this._uhr = locator.resolve('uhr');
    this._config = this.$context.locator.resolve('config');
    this._api = this._api || this._config.api;

    this._path = '/company';
    this._options = {
        data: {
            filter: '["and", ["=","number", ":number"]]',
            expand: "master,masters,videos,albums,contacts,schedule,workCondition"
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
    var company = [];
    var promises = [];
    if (!id)
        return;

    this._optionsData.data.filter[':number'] = id;
    return this._load()
        .then(function (result) {
            if (result.content.length == 0 || result.content[0].masters.count_masters == 0)
                self.$context.notFound();
            company = result.content[0];
            return company;
        })
        .then(function (company) {
            var listID = [];
            company.masters.forEach(function (master) {
                listID.push(master.id);
            });
            return self.$context.sendAction("master/MasterListForCompany", "setListID", listID);
        })
        .then(function (r) {
            promises[0] = self.$context.getStoreData('master/MasterListForCompany');
            // Если есть альбом, подтаскиваем фотографии отдельным запросом
            if (company.albums[0].id) {
                promises[1] = self._uhr.get(self._api + '/album/' + company.albums[0].id, {data: {expand: 'photos'}});
            }
            return Promise.all(promises);
        })
        .then(function (resultArr) {
            company.albums = [resultArr[1].content];
            company.masters = resultArr[0];
            company.isBlock = {
                master: {
                    access: true,
                    name: "Мастера",
                    active: true
                },
                work: {
                    access: true,
                    name: "Условия работы",
                    active: (company.schedule.length > 0)
                },
                about: {
                    access: true,
                    name: "О компании",
                    active: (company.about)
                },
                photo: {
                    access: true,
                    name: "Фото",
                    active: (company.albums.length > 0)
                },
                video: {
                    access: true,
                    name: "Видео",
                    active: (company.videos.length > 0)
                }
            };

            return company;
        });
};

