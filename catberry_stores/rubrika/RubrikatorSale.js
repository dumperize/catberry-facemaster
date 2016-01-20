'use strict';

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
    this._groups = [
        {
            name: "Ремонт, строительство, интерьер",
            childrenID: [86, 87, 88, 102]
        },
        {
            name: "Здоровье, красота, мода",
            childrenID: [24, 143, 113, 27, 132]
        },
        {
            name: "Отдых и праздники",
            childrenID: [36, 103, 125, 149]
        },
        {
            name: "Консультации",
            childrenID: [5, 114]
        },
        {
            name: "Автоуслуги и доставка",
            childrenID: [19, 106]
        },
        {
            name: "Недвижимость",
            childrenID: [1]
        },
        {
            name: "Техника",
            childrenID: [42]
        },
        {
            name: "Дригие услуги",
            childrenID: []
        }
    ];
    this._parentToGroup = {};
    this.loadRubriks = false;
    var self = this;
    for (var i = 0; i < this._groups.length; ++i) {
        var el = this._groups[i];
        el.childrenID.forEach(function (id) {
            self._parentToGroup[id] = i;
        });
    }
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
            var data = result.content;
            var dataLevel = {};

            //сначала выстраиваем древовидную структуру
            data.forEach(function (el) {
                if (el.parentID == 0) {
                    if (!dataLevel[el.id])
                        dataLevel[el.id] = {root: el, child: [], saleCount: 0};
                    dataLevel[el.id].root = el;

                    if (self._parentToGroup[el.id] == undefined) {
                        self._groups[self._groups.length - 1].childrenID.push(el.id);
                    }
                } else {
                    if (!dataLevel[el.parentID])
                        dataLevel[el.parentID] = {root: {}, child: [], saleCount: 0};

                    dataLevel[el.parentID].saleCount += +el.saleCount;
                    dataLevel[el.parentID].child.push(el);
                }
            });

            //затем прицепляем к главному дереву
            self._groups.forEach(function (el) {
                el.children = [];
                el.saleCount = 0;

                if (el.childrenID.length == 1) {
                    var id = el.childrenID[0];
                    el.saleCount = dataLevel[id].saleCount;
                    dataLevel[id].root = false;
                    el.children.push(dataLevel[id]);
                } else {
                    el.childrenID.forEach(function (id) {
                        el.saleCount += dataLevel[id].saleCount;
                        el.children.push(dataLevel[id]);
                    });
                }
            });
        });
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
