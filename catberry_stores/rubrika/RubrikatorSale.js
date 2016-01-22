'use strict';

var RubrikaFormat = require('../../lib/util/RubrikaFormat');
var Rubrikator = require("../../config/saleCatalog.json");

module.exports = RubrikatorSale;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "rubrika/rubrikatorSale" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function RubrikatorSale($uhr) {
    this._uhr = $uhr;
    this._path = 'http://api-fm.present-tlt.ru/rubrika';
    this._options = {
        data: {
            filter: '["and",["=", "status", "1"]]',
            expand: 'saleCount',
            order: 'sort',
            limit: 300
        }
    };
    this._groups = this._cloneRubrikator(Rubrikator);
    this._parentToGroup = this._getParentToGroup(this._groups);
    this.loadRubriks = false;
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
RubrikatorSale.prototype._uhr = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
RubrikatorSale.prototype.$lifetime = 60000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
RubrikatorSale.prototype.load = function () {
    var self = this;
    var currentRubrika = self.$context.state.catalog;

    if (self.loadRubriks) {
        return {
            active: currentRubrika,
            list: self._groups
        }
    }
    return this._loadData()
        .then(function () {
            self.loadRubriks = true;
            return {
                active: currentRubrika,
                list: self._groups
            }
        });
};
/**
 * Загрузка рубрикатора и перестройка под нужный формат
 * @returns {*}
 * @private
 */
RubrikatorSale.prototype._loadData = function () {
    var self = this;

    return this._uhr.get(this._path, this._options)
        .then(function (result) {
            if (result.status.code >= 400 && result.status.code < 600) {
                throw new Error(result.status.text);
            }
            //сначала выстраиваем древовидную структуру
            var tree = RubrikaFormat.makeTree(result.content, function (el, tree) {
                if (el.parentID != 0) {
                    if (!tree[el.parentID].parent.saleCount)
                        tree[el.parentID].parent.saleCount = 0;
                    tree[el.parentID].parent.saleCount += +el.saleCount;
                } else {
                    if (self._parentToGroup[el.id] == undefined) {
                        self._parentToGroup[el.id] = self._groups.length - 1;
                        self._groups[self._groups.length - 1].childID.push(el.id);
                    }
                }
            });

            //затем прицепляем к главному дереву
            var data = self._groups;
            tree.forEach(function (el) {
                var index = self._parentToGroup[el.parent.id];
                if (data[index].childID.length == 1) {
                    data[index].root = true;
                    data[index].parent = el.parent;
                    data[index].podrubriks = el.podrubriks;
                } else {
                    data[index].root = true;
                    data[index].parent.saleCount += +el.parent.saleCount;
                    data[index].podrubriks.push({
                        root: true,
                        parent: el.parent,
                        podrubriks: el.podrubriks
                    });
                }
            });
            return self._groups;
        });
};
RubrikatorSale.prototype._getParentToGroup = function (groups) {
    var returnObj = {};
    for (var i = 0; i < groups.length; ++i) {
        var el = groups[i];
        el.childID.forEach(function (id) {
            returnObj[id] = i;
        });
    }
    return returnObj;
};

RubrikatorSale.prototype._cloneRubrikator = function (obj) {
    var copy;
    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = this._cloneRubrikator(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = this._cloneRubrikator(obj[attr]);
        }
        return copy;
    }
    return obj;
};

/**
 * Handles action named "some-action" from any component.
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
RubrikatorSale.prototype.handleSomeAction = function () {
    // Here you can call this.$context.changed() if you know
    // that remote data source has been changed.
    // Also you can have many handle methods for other actions.
};
