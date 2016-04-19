'use strict';


module.exports = Rubrikator;

var RubrikaFormat = require('../../lib/util/RubrikaFormat');
var util = require('util'),
    StoreBase = require('../../lib/StoreBase');

/**
 * наследуемся от пагинатора для базового стора
 */
util.inherits(Rubrikator, StoreBase);

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
    StoreBase.call(this);

    this._path = '/rubrika';
    this._options = {
        data: {
            filter: '["and",["=", "status", "1"]]',
            expand: "masterCount",
            order: 'sort',
            limit: 300
        }
    };
    this._countName = 'masterCount';
}

Rubrikator.prototype._countName = null;
/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */

Rubrikator.prototype.load = function () {
    var self = this;
    return this._load()
        .then(function (result) {
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