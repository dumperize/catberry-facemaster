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
    this._model;
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
Paginator.prototype.$lifetime = 60000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
Paginator.prototype.load = function () {
    if (!this._model)
        return null;
    var self = this;
    var currentPage = this.$context.state.currentPage || 1;

    return Promise.resolve(1)
        .then(function () {
            return self.$context.getStoreData(self._model);
        })
        .then(function () {
            return self.$context.sendAction(self._model, "getPaginator")
        })
        .then(function (data) {
            if (data['is-paginator'] == false)
                return data;
            var start = data.current - 4 < 0 ? 1 : data.current - 4;
            var end = start + 9 < data.count ? start + 9 : data.count;
            var list = [];
            for (var i = start; i <= end; ++i) {
                list.push({
                    "is-selected": (data.current == i),
                    "url": data.url + i,
                    "number": i
                });
            }

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
 * Handles action named "some-action" from any component.
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
Paginator.prototype.handleSetModel = function (model) {
    this._model = model;
};
Paginator.prototype.handleGetCurrentPage = function () {
    return this.$context.state.currentPage || 1;
}
