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
    this._path = 'http://api-fm.present-tlt.ru/' + this.nameCatalog + '/active';
    this._options = {
        data: {
            expand: 'owner'
        }
    };
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
StoreCatalog.prototype._uhr = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
StoreCatalog.prototype.$lifetime = 60000;
/**
 * Хранилище для рубрикатора
 * @type {Array}
 * @private
 */
StoreCatalog.prototype._rubrikator = [];

/**
 * Устанавливаем значение для url в пагинаторе
 * Вызовем этот метод, когда узнаем текущую рубрику
 * @param rubrika
 * @private
 */
StoreCatalog.prototype._setUrlForPage = function (rubrika) {
    this._url = "/" + this.nameCatalog + "/catalog/" + rubrika + "/page/";
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
            //запомним весь рубрикатор в переменной
            self._rubrikator = rubrikator.list;
            //если нет активной рубрики значит это главная страница
            if (!rubrikator.active)
                return self._getDataForMainPage();//сформируем данные для главной страницы

            //иначее сформируем данные для рубрики
            //но для начала установим url для навигации по текущей рубрике
            self._setUrlForPage(rubrikator.active);
            return self._getDataForRubrikaPage(rubrikator.active);
        });
};

/**
 * Формирование данных для главной страницы каталога скидок
 * @returns {Promise}
 * @private
 */
StoreCatalog.prototype._getDataForMainPage = function () {
    return this._getDataForRubrikaPage();
};

/**
 * Формирование данных для страницы рубрики каталога скидок
 * @param currentRubrika текуая рубрика
 * @returns {Promise}
 * @private
 */
StoreCatalog.prototype._getDataForRubrikaPage = function (currentRubrika) {
    var self = this;
    var listID = [];

    if (currentRubrika) {
        //переберем весь рубрикатор и отметим активностью те ветви которые необходимо открыть
        //также сразу подготовим список id для запроса по данным для каталога
        this._rubrikator.forEach(function (el) {
            if (el.parent.id == currentRubrika)
                el.podrubriks.forEach(function (podrubrika) {
                    listID.push(podrubrika.id);
                })
        });

        this._options.data.filter = '["and", ["in", "rubrikaID",[' + listID.join(',') + ']]]';
    }
    this._options.data.limit = 20;
    return this._uhr.get(this._path, this._options)
        .then(function (result) {
            if (result.status.code >= 400 && result.status.code < 600) {
                throw new Error(result.status.text);
            }
            self._pageCount = result.status.headers['x-pagination-page-count'];
            return result.content;
        })
        .then(function (data) {
            return {
                currentPage: self._currentPage,
                currentRubrika: currentRubrika,
                rubrikator: self._rubrikator,
                data: data
            };
        });
};