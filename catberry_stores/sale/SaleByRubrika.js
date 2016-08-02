'use strict';
module.exports = SaleByRubrika;

var util = require('util'),
    StoreCatalog = require('../../lib/StoreCatalog');
/**
 * наследуемся от базового стора каталогов
 */
util.inherits(SaleByRubrika, StoreCatalog);

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
    //вызываем базовый Store с параметром sale
    StoreCatalog.call(this, "sale");
}
/**
 * Массив содержащий id рубрик по которым нужно сделать запрос к БД, исходя из id полученного каталога от routers
 * @type {Array}
 * @private
 */
SaleByRubrika.prototype._listID = [];
/**
 * Формирование данных для страницы рубрики каталога скидок
 * Требует рефакторинга
 * @param currentRubrika текуая рубрика
 * @returns {Promise}
 * @private
 */
SaleByRubrika.prototype._getData = function (list, currentRubrika) {
    var self = this;
    var limit = currentRubrika ? 20 : 4;

    self._setListID(list);
    var promises = list.map(function (el) {
        if (!currentRubrika)
            return self._getSaleData(el.parent.podrubriksID, limit);

        //для каждого делаем запрос к api
        return self._getSaleData(self._listID[currentRubrika.id], limit);
    });

    return Promise.all(promises)
        //затем добавим к данным по рубрикам принадлежащие им скидки
        .then(function (sale) {
            for (var i = 0; i < list.length; i++) {
                list[i].sale = sale[i];
            }
            //поправочка для главной сраницы (выводим 4 акции и обнуляем пагинатор)
            if (!currentRubrika)
                self._pageCount = 1;
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
    if (!id && id.length == 0) {
        self._pageCount = 1;
        return null;
    }
    this._options.data.filter = '["and", ["in", "rubrikaID",[' + id.join(',') + ']]]';
    this._options.data.limit = limit;
    return this._load()
        .then(function (result) {
            self._pageCount = result.status.headers['x-pagination-page-count'];
            return result.content;
        });
};
/**
 * Создает массив id рубрики => список id рубрик для запроса в БД
 * @param list объект пришедший из RubrikatorSale
 * @private
 */
SaleByRubrika.prototype._setListID = function (list) {
    var self = this;
    list.forEach(function (el) {
        if (el.root) {
            self._listID[el.parent.id] = el.parent.podrubriksID;
            self._setListID(el.podrubriks);
        } else {
            self._listID[el.id] = el.podrubriksID;
        }
    })
};