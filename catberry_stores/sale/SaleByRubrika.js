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
    // выясним текущую страницу
    return self.$context.sendAction("Paginator", "getCurrentPage")
        .then(function (page) {
            //установим значения для страницы
            self._currentPage = page;
            self._options.data.page = page;
            //выясним текущие данные по рубрике
            return self.$context.getStoreData("rubrika/RubrikatorSale")
        })
        .then(function (rubrikator) {
            //если нет активной рубрики значит это главная страница
            if (!rubrikator.active)
                return self._getDataForMainPage(rubrikator.list);//сформируем данные для главной страницы

            //иначее сформируем данные для рубрики
            //но для начала установим url для навигации по текущей рубрике
            self._setUrlForPage(rubrikator.active);
            return self._getDataForRubrikaPage(rubrikator.list, rubrikator.active);
        });
};
/**
 * Формирование данных для главной страницы каталога скидок
 * @returns {Promise}
 * @private
 */
SaleByRubrika.prototype._getDataForMainPage = function (list) {
    var self = this;
    var promises = [];//массив для промисов

    //Сформируем список id по группам рубрик, для того чтобы достать по 4 акции для каждой группы
    list.forEach(function (el) {
        var listID = [];
        if (el.root) {
            el.active = true;
            el.podrubriks.forEach(function (elLevel2) {
                elLevel2.active = false;
                if (elLevel2.root) {
                    elLevel2.podrubriks.forEach(function (elLevel3) {
                        elLevel3.active = false;
                        listID.push(elLevel3.id);
                    });
                } else {
                    listID.push(elLevel2.id);
                }
            });
        }
        //для каждого делаем запрос к api
        promises.push(self._getSaleData(listID, 4));
    });
    //ждем когда все промисы выполнятся
    return Promise.all(promises)
        //затем добавим к данным по рубрикам принадлежащие им скидки
        .then(function (sale) {
            self._pageCount = 1;
            for (var i = 0; i < list.length; i++) {
                list[i].sale = sale[i];
            }
            // и отдадим все это в hbs
            return list;
        });
};

/**
 * Формирование данных для страницы рубрики каталога скидок
 * Требует рефакторинга
 * @param currentRubrika текуая рубрика
 * @returns {Promise}
 * @private
 */
SaleByRubrika.prototype._getDataForRubrikaPage = function (list, currentRubrika) {
    var self = this;
    var listID = [];
    var promises = [];//массив для промисов

    //!!!внимание требует рефакторинга
    list.forEach(function (el) {
        var listID = [];
        var flag = false;
        if (el.root) {

            if (el.parent.id == currentRubrika) {
                el.active = true;
                flag = true;
            } else {
                el.active = false;
            }

            el.podrubriks.forEach(function (elLevel2) {
                var flag2 = false;
                if (elLevel2.root) {

                    if (elLevel2.parent.id == currentRubrika) {
                        elLevel2.active = true;
                        el.active = true;
                        flag2 = true;
                    } else {
                        elLevel2.active = false;
                    }

                    elLevel2.podrubriks.forEach(function (elLevel3) {
                        var flag3 = false;
                        if (elLevel3.id == currentRubrika) {
                            elLevel3.active = true;
                            elLevel2.active = true;
                            el.active = true;
                            flag3 = true;
                        } else {
                            elLevel3.active = false;
                        }
                        if (flag || flag2 || flag3)
                            listID.push(elLevel3.id);
                    });
                } else {
                    if (elLevel2.id == currentRubrika) {
                        elLevel2.active = true;
                        el.active = true;
                        flag2 = true;
                    } else {
                        elLevel2.active = false;
                    }
                    if (flag || flag2)
                        listID.push(elLevel2.id);
                }
            });
        }
        //для каждого делаем запрос к api
        promises.push(self._getSaleData(listID, 20));
    });

    return Promise.all(promises)
        //затем добавим к данным по рубрикам принадлежащие им скидки
        .then(function (sale) {
            for (var i = 0; i < list.length; i++) {
                list[i].sale = sale[i];
            }
            // и отдадим все это в hbs
            return list;
        });
};

/**
 * Возвращает список акций по списку id рубрики
 * @param id масиив список id рубрик
 * @returns {*}
 * @private
 */
SaleByRubrika.prototype._getSaleData = function (id, limit) {
    var self = this;

    if (id.length == 0) {
        self._pageCount = 1;
        return null;
    }
    this._options.data.filter = '["and", ["in", "rubrikaID",[' + id.join(',') + ']]]';
    this._options.data.limit = limit;
    return this._uhr.get(this._path, this._options)
        .then(function (result) {
            if (result.status.code >= 400 && result.status.code < 600) {
                throw new Error(result.status.text);
            }
            self._pageCount = result.status.headers['x-pagination-page-count'];
            return result.content;
        });
};