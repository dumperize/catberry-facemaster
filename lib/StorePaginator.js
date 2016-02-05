'use strict';

module.exports = StorePaginator;

var util = require('util'),
    StoreBase = require('./StoreBase');

/**
 * наследуемся от пагинатора для базового стора
 */
util.inherits(StorePaginator, StoreBase);

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 * Это базовая модель Store с пагинатором
 */

/**
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function StorePaginator() {
    StoreBase.call(this);

    this._pageCount = 1;//количество
    this._currentPage = 1;//текущая
    this._url = '';//url для вставки в пагинатор

    this.$context.setDependency("Paginator");//зависимость от Store пагинатор
}

/**
 * Loads data from remote source.
 * Базовая загрузка данных
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
StorePaginator.prototype.load = function () {
    var self = this;
    var path = this._path;
    //получаем текущую страницу
    return self.$context.sendAction("Paginator", "getCurrentPage")
        .then(function (page) {
            self._currentPage = page;
            self._options.data.page = page;
            return self._load();
        })
        .then(function (result) {
            //устанавливаем количество страниц для дальнейшего пагинаторства
            self._pageCount = result.status.headers['x-pagination-page-count'];
            return {
                currentPage: self._currentPage,
                data: result.content
            };
        });
};

/**
 * Получить данные для пагиантора
 * @returns {*}
 */
StorePaginator.prototype.handleGetPaginator = function () {
    if (!this._pageCount || this._pageCount == 1) {
        return {
            "is-paginator": false
        }
    }
    return {
        "is-paginator": true,
        "url": this._url,
        "count": this._pageCount,
        "current": this._currentPage
    };
};