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
 * Текущая рубрика (объект)
 * @type {{}}
 * @private
 */
RubrikatorSale.prototype._currentRubrikaObj = null;
/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
RubrikatorSale.prototype.load = function () {
    var self = this;
    var currentRubrika = self.$context.state.catalog;

    if (self.loadRubriks) {
        self._setActive(self._groups, currentRubrika);
        this._setCurrentRubrikaObj(self._groups, currentRubrika);
        return {
            active: self._currentRubrikaObj,
            list: self._groups
        }
    }
    return this._loadData()
        .then(function () {
            self.loadRubriks = true;
            return {
                active: self._currentRubrikaObj,
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
            tree = RubrikaFormat.setPodrubriksID(tree);

            //затем прицепляем к главному дереву
            var data = self._groups;
            tree.forEach(function (el) {
                var index = self._parentToGroup[el.parent.id];

                if (data[index].childID.length == 1) {
                    data[index].parent = el.parent;
                    data[index].podrubriks = el.podrubriks;
                } else {
                    data[index].parent.saleCount += +el.parent.saleCount;
                    data[index].podrubriks.push({
                        root: true,
                        parent: el.parent,
                        podrubriks: el.podrubriks
                    });
                }
                data[index].root = true;
                data[index].parent.podrubriksID = data[index].parent.podrubriksID.concat(el.parent.podrubriksID);

            });

            //отмечаем акивные вершины в соответсвии с деревом
            self._setActive(self._groups, self.$context.state.catalog);

            //устанавливаем текущую подрубрику
            self._setCurrentRubrikaObj(self._groups, self.$context.state.catalog);

            //возвращаем итоговое дерево
            return self._groups;
        });
};
/**
 * Формирует массив где каждому id рубрики соответствет номер группы в которой он расположен
 * @param groups
 * @returns {{}}
 * @private
 */
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

/**
 * Устанавливает нужные вершины дерева в активное состояние
 * @param tree
 * @param current
 * @returns {boolean}
 * @private
 */
RubrikatorSale.prototype._setActive = function (tree, current) {
    //для главной страницы
    if (!current)
        this._setClear(tree);

    var self = this;
    var mySlibdigsActive = false;
    var myChildActive = false;

    tree.forEach(function (el) {
        if (!current) {
            el.parent.active = true;
            return;
        }
        var temp = el;
        if (el.root) {
            myChildActive = self._setActive(el.podrubriks, current);
            temp = el.parent
        }
        temp.active = myChildActive || (temp.id == current);
        mySlibdigsActive = mySlibdigsActive || temp.active;
    });
    return mySlibdigsActive;
};

/**
 * Устанавливает нужные вершины дерева в активное состояние для главной страницы
 * @param tree
 * @param current
 * @returns {boolean}
 * @private
 */
RubrikatorSale.prototype._setClear = function (tree) {
    var self = this;
    var mySlibdigsActive = false;
    var myChildActive = false;

    tree.forEach(function (el) {
        if (el.root) {
            el.parent.active = false;
            self._setClear(el.podrubriks);
        } else {
            el.active = false;
        }
    });
    return mySlibdigsActive;
};

/**
 * Установка текущей подрубрики в виде объекта
 * @param tree
 * @param current
 * @returns {null}
 * @private
 */
RubrikatorSale.prototype._setCurrentRubrikaObj = function (tree, current) {
    if (!current) {
        this._currentRubrikaObj = null;
        return null;
    }

    var found = false;
    var self = this;

    rec(tree);

    if (!found)
        return this.$content.notFound();

    function rec(tree) {
        tree.forEach(function (el) {
            if (el.root) {
                if (el.parent.id == current) {
                    self._currentRubrikaObj = el.parent;
                    found = true;
                    return;
                }
                rec(el.podrubriks, current);
            } else {
                if (el.id == current) {
                    self._currentRubrikaObj = el;
                    found = true;
                }
            }
        });
    }
};

/**
 * Полностью копирует рубрикатор (hard)
 * @param obj
 * @returns {*}
 * @private
 */
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
