'use strict';

module.exports = StorePaginator;

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
    this._uhr = this.$context.locator.resolve('uhr');
    this._config = this.$context.locator.resolve('config');
    this._pageCount = 1;//количество
    this._currentPage = 1;//текущая
    this._path = '';//путь к api
    this._options = {data: {}};//опции для запроса к api
    this._url = '';//url для вставки в пагинатор

    this.$context.setDependency("Paginator");//зависимость от Store пагинатор
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
StorePaginator.prototype._uhr = null;

StorePaginator.prototype._config = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
StorePaginator.prototype.$lifetime = 60000;

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
            return self._uhr.get(path, self._options)
        })
        .then(function (result) {
            if (result.status.code >= 400 && result.status.code < 600) {
                throw new Error(result.status.text);
            }
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