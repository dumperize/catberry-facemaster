'use strict';

module.exports = StoreBase;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "master/masterList" store.
 * @constructor
 */
function StoreBase() {
    this._uhr = this.$context.locator.resolve('uhr');
    this._config = this.$context.locator.resolve('config');
    this._path = '/';
    this._options = {
        data: {
            filter: '',
            expand: '',
            limit: '',
            order: '',
            page: ''
        }
    };
    this._optionsData = {
        data: {
            filter: {},
            expand: {},
            limit: {},
            order: {},
            page: {}
        }
    };
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
StoreBase.prototype._uhr = null;

/**
 * Config application
 * @type {null}
 * @private
 */
StoreBase.prototype._config = null;

/**
 * Path to api
 * @type {null}
 * @private
 */
StoreBase.prototype._path = null;

/**
 * Options to api
 * @type {{}}
 * @private
 */
StoreBase.prototype._options = {};

/**
 * Переменные для фильтра в запросе
 * @type {{}}
 * @private
 */
StoreBase.prototype._optionsData = {};

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
StoreBase.prototype.$lifetime = 60000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
StoreBase.prototype._load = function () {
    return this._loadByParam(this._path, this._setOptions(this._options, this._optionsData));
};


StoreBase.prototype._loadByParam = function (path, options) {
    var self = this;
    return this._uhr.get(this._config.api + path, options)
        .then(function (result) {
            if (result.status.code == 404) {
                self.$context.notFound();
            }
            if (result.status.code >= 400 && result.status.code < 600) {
                throw new Error(result.status.text);
            }
            return result;
        })
};

StoreBase.prototype._setOptions = function (_options, _optionsData) {
    var options = _options.data;
    var optionsData = _optionsData.data;

    var self = this;
    var result = {};
    Object.keys(options)
        .forEach(function (el) {
            var str = options[el];
            Object.keys(optionsData[el])
                .forEach(function (data) {
                    str = str.replace(new RegExp(data, 'g'), optionsData[el][data]);
                });
            result[el] = str;
        });
    return {
        data: result
    };
};

StoreBase.prototype.send = function (path, data) {
    return this._uhr.post(this._config.api + path, data)
        .then(function (data) {
            if (data.status.code == 422) {
                return {
                    success: false,
                    error: data.content
                }
            } else if (data.status.code != 200) {
                throw new Error(data.status.text);
            } else {
                return {
                    success: true,
                    total: data.status.headers['x-pagination-page-count'],
                    list: data.content
                }
            }
        })
};