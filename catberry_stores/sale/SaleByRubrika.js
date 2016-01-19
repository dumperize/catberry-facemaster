'use strict';
module.exports = SaleByRubrika;

var util = require('util'),
    StorePaginator = require('../../lib/StorePaginator');
/**
 * наследуемся от пагинатора для постраничной навигации
 */
util.inherits(SaleByRubrika, StorePaginator);

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "sale/SaleByRubrika" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function SaleByRubrika($uhr) {
    StorePaginator.call(this);
    this.$context.setDependency("rubrika/RubrikatorSale");
    this._path = 'http://api-fm.present-tlt.ru/sale/active';
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
SaleByRubrika.prototype._uhr = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
SaleByRubrika.prototype.$lifetime = 60000;
/**
 * Хранилище для рубрикатора
 * @type {Array}
 * @private
 */
SaleByRubrika.prototype._rubrikator = [];

/**
 * Устанавливаем значение для url в пагинаторе
 * Вызовем этот метод, когда узнаем текущую рубрику
 * @param rubrika
 * @private
 */
SaleByRubrika.prototype._setUrlForPage = function (rubrika) {
    this._url = "/sale/catalog/" + rubrika + "/page/";
};

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
SaleByRubrika.prototype.load = function () {
    var self = this;
    return Promise.resolve(1)
        .then(function () {
            // выясним текущую страницу
            return self.$context.sendAction("Paginator", "getCurrentPage");
        })
        .then(function (page) {
            //установим значения для страницы
            self._currentPage = page;
            self._options.data.page = page;
            //выясним текущие данные по рубрике
            return self.$context.getStoreData("rubrika/RubrikatorSale")
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
SaleByRubrika.prototype._getDataForMainPage = function () {
    var self = this;
    var promises = [];//массив для промисов

    //Сформируем список id по группам рубрик, для того чтобы достать по 4 акции для каждой группы
    this._rubrikator.forEach(function (el) {
        var listID = [];
        el.children.forEach(function (child) {
            child.child.forEach(function (rubrika) {
                listID.push(rubrika.id);
            });
        });
        //для каждого делаем запрос к api
        promises.push(self._getSaleData(listID));
    });
    //ждем когда все промисы выполнятся
    return Promise.all(promises)
        //затем добавим к данным по рубрикам принадлежащие им скидки
        .then(function (sale) {
            for (var i = 0; i < self._rubrikator.length; i++) {
                self._rubrikator[i].sale = sale[i];
            }
            // и отдадим все это в hbs
            return self._rubrikator;
        });
};

/**
 * Формирование данных для страницы рубрики каталога скидок
 * @param currentRubrika текуая рубрика
 * @returns {Promise}
 * @private
 */
SaleByRubrika.prototype._getDataForRubrikaPage = function (currentRubrika) {
    var self = this;
    var listID = [];

    //переберем весь рубрикатор и отметим активностью те ветви которые необходимо открыть
    //также сразу подготовим список id для запроса по акциям
    this._rubrikator.forEach(function (el) {
        el.active = false;

        el.children.forEach(function (child) {
            if (child.root)
                child.root.active = false;
            if (child.root && child.root.id == currentRubrika) {
                el.active = true;
                child.root.active = true;
                currentRubrika = child.root;

                child.child.forEach(function (rubrika) {
                    rubrika.active = false;
                    listID.push(rubrika.id);
                });
            } else {
                child.child.forEach(function (rubrika) {
                    if (rubrika.id == currentRubrika) {
                        rubrika.active = true;
                        el.active = true;
                        child.root.active = true;
                        currentRubrika = rubrika;
                        listID.push(rubrika.id);
                    } else {
                        rubrika.active = false;
                    }
                });
            }
        });
    });

    this._options.data.filter = '["and", ["in", "rubrikaID",[' + listID.join(',') + ']]]';
    this._options.data.limit = 20;
    return this._uhr.get(this._path, this._options)
        .then(function (result) {
            if (result.status.code >= 400 && result.status.code < 600) {
                throw new Error(result.status.text);
            }
            self._pageCount = result.status.headers['x-pagination-page-count'];
            return result.content;
        })
        .then(function (sale) {
            return {
                currentPage: self._currentPage,
                currentRubrika: currentRubrika,
                rubrikator: self._rubrikator,
                sale: sale
            };
        });
};

/**
 * Возвращает список акций по списку id рубрики
 * @param id масиив список id рубрик
 * @returns {*}
 * @private
 */
SaleByRubrika.prototype._getSaleData = function (id) {
    this._options.data.filter = '["and", ["in", "rubrikaID",[' + id.join(',') + ']]]';
    this._options.data.limit = 4;
    return this._uhr.get(this._path, this._options)
        .then(function (result) {
            if (result.status.code >= 400 && result.status.code < 600) {
                throw new Error(result.status.text);
            }
            return result.content;
        });
};