'use strict';

var RubrikaFormat = require('../../lib/util/RubrikaFormat');

module.exports = Rubrikator;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "rubrika/Rubrikator" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function Rubrikator($uhr) {
    this._uhr = $uhr;
    this._config = this.$context.locator.resolve('config');

    this._path = this._config.api + '/rubrika';
    this._options = {
        data: {
            filter: '["and",["=", "status", "1"]]',
            expand: "masterCount",
            order: 'sort',
            limit: 300
        }
    };
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
Rubrikator.prototype._uhr = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
Rubrikator.prototype.$lifetime = 600000;

Rubrikator.prototype._countName = 'masterCount';
/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */

Rubrikator.prototype.load = function () {
    var self = this;
    return this._uhr.get(this._path, this._options)
        .then(function (result) {
            if (result.status.code >= 400 && result.status.code < 600) {
                throw new Error(result.status.text);
            }
            //сделаем древовидную структуру и подсчитаем количество элементов для родителя
            return RubrikaFormat.makeTree(result.content, self._intoMakeTreeFunction.bind(self));
        });
};

/**
 * Функция, которая вызывается для каждого элемента в дереве (т.е. для каждой рубрике).
 * @param el
 * @param tree
 * @private
 */
Rubrikator.prototype._intoMakeTreeFunction = function (el, tree) {
    if (el.parentID != 0) {
        tree[el.parentID].parent.count = +el[this._countName] +
            (tree[el.parentID].parent.count ? tree[el.parentID].parent.count : 0);
        el.count = el[this._countName];
    }
};