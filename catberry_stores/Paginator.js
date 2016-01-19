'use strict';

module.exports = Paginator;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "Paginator" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function Paginator($uhr) {
    this._uhr = $uhr;
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
Paginator.prototype._uhr = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
Paginator.prototype.$lifetime = 0;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
Paginator.prototype.load = function () {
    //если не определена модель то вернем пустоту
    if (!this._model)
        return null;

    var self = this;
    var currentPage = this.$context.state.currentPage || 1;

    //заставляем модель взять для себя данные (если она этого еще не сделала)
    return self.$context.getStoreData(self._model)
        .then(function () {
            //шлём сигнал "получить пагинатор"
            return self.$context.sendAction(self._model, "getPaginator")
        })
        .then(function (data) {
            if (data['is-paginator'] == false)
                return data;
            //устанавливаем начальную и конечную страницу
            var start = data.current - 4 <= 0 ? 1 : data.current - 4;
            var end = start + 9 < data.count ? start + 9 : data.count;
            var list = [];
            for (var i = start; i <= end; ++i) {
                list.push({
                    "is-selected": (data.current == i),
                    "url": data.url + i,
                    "number": i
                });
            }
            //возвращаем данные
            return {
                model: self._model,
                "is-paginator": true,
                start: {
                    url: data.url + 1
                },
                end: {
                    url: data.url + data.count
                },
                list: list
            }
        });
};

/**
 * Устанавливаем название текущей модели
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
Paginator.prototype.handleSetModel = function (model) {
    this._model = model;
};
/**
 * Забрать текущую страницу
 * @returns {*|string|number}
 */
Paginator.prototype.handleGetCurrentPage = function () {
    return this.$context.state.currentPage || 1;
};