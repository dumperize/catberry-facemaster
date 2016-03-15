'use strict';
module.exports = StoreCatalog;

var util = require('util'),
    StorePaginator = require('./StorePaginator');
/**
 * наследуемся от пагинатора для постраничной навигации
 */
util.inherits(StoreCatalog, StorePaginator);

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "catalog/catalogByRubrika" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function StoreCatalog(name) {
    StorePaginator.call(this);

    this.nameCatalog = name;
    this.nameCatalogCapitalizeFirstLetter = this.nameCatalog.charAt(0).toUpperCase() + this.nameCatalog.slice(1);

    this.$context.setDependency("rubrika/Rubrikator" + this.nameCatalogCapitalizeFirstLetter);
    this._path = "/" + this.nameCatalog + '/active';
    this._options = {
        data: {
            expand: 'owner',
            filter: '["and", ["in", "rubrikaID",[:rubrikaID]],["=","showInCatalog","1"]]',
            limit: 20
        }
    };
}

/**
 * Устанавливаем значение для url в пагинаторе
 * Вызовем этот метод, когда узнаем текущую рубрику
 * @param rubrika
 * @private
 */
StoreCatalog.prototype._setUrlForPage = function (rubrika) {
    if (rubrika)
        this._url = "/" + this.nameCatalog + "/catalog/" + rubrika.id + "/page/";
    else
        this._url = "/" + this.nameCatalog + "/page/";
};

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
StoreCatalog.prototype.load = function () {
    var self = this;
    return self.$context.sendAction("Paginator", "getCurrentPage")
        .then(function (page) {
            //установим значения для страницы
            self._currentPage = page;
            self._options.data.page = page;
            //выясним текущие данные по рубрике
            return self.$context.getStoreData("rubrika/Rubrikator" + self.nameCatalogCapitalizeFirstLetter);
        })
        .then(function (rubrikator) {
            //для начала установим url для навигации по текущей рубрике
            self._setUrlForPage(rubrikator.active);
            //сформируем данные
            return self._getData(rubrikator.list, rubrikator.active);
        });
};

/**
 * Формирование данных для страницы рубрики каталога скидок
 * @param currentRubrika текуая рубрика
 * @returns {Promise}
 * @private
 */
StoreCatalog.prototype._getData = function (list, currentRubrika) {
    var self = this;
    var listID = [];

    if (currentRubrika) {
        //также сразу подготовим список id для запроса по данным для каталога
        list.forEach(function (el) {
            if (el.parent.id == currentRubrika.id)
                el.podrubriks.forEach(function (podrubrika) {
                    listID.push(podrubrika.id);
                })
        });
        this._options.data.filter = '["and", ["in", "rubrikaID",[:rubrikaID]],["=","showInCatalog","1"]]';
        this._optionsData.data.filter[':rubrikaID'] = listID.join(',');
    } else {
        this._options.data.filter = '';
        this._optionsData.data.filter[':rubrikaID'] = '';
    }

    return this._load()
        .then(function (result) {
            self._pageCount = result.status.headers['x-pagination-page-count'];
            return result.content;
        })
        .then(function (data) {
            return {
                currentPage: self._currentPage,
                currentRubrika: currentRubrika,
                rubrikator: list,
                data: data
            };
        });
};
