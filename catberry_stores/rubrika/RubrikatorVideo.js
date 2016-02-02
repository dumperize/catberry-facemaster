'use strict';

var RubrikaFormat = require('../../lib/util/RubrikaFormat');

module.exports = RubrikatorVideo;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "rubrika/rubrikatorVideo" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function RubrikatorVideo($uhr) {
    this._uhr = $uhr;
    this._path = 'http://api.facemaster.ru/rubrika';
    this._options = {
        data: {
            filter: '["and",["=", "status", "1"]]',
            expand: 'videoCount',
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
RubrikatorVideo.prototype._uhr = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
RubrikatorVideo.prototype.$lifetime = 60000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
RubrikatorVideo.prototype.load = function () {
    var self = this;
    var currentRubrika = this.$context.state.catalog;

    return this._uhr.get(this._path, this._options)
        .then(function (result) {
            if (result.status.code >= 400 && result.status.code < 600) {
                throw new Error(result.status.text);
            }

            var isExistRubrika = false; //для проверки на 404 страницу
            //сделаем древовидную структуру и подсчитаем количество видео для родителя
            var tree = RubrikaFormat.makeTree(result.content, function (el, tree) {
                if (el.parentID != 0) {
                    if (!tree[el.parentID].parent.videoCount)
                        tree[el.parentID].parent.videoCount = 0;
                    tree[el.parentID].parent.videoCount += +el.videoCount;
                } else if (el.id == currentRubrika) {
                    //проверим правильный ли id рубрики пришел. Может быть только родительский
                    isExistRubrika = true;
                    currentRubrika = el;
                }
            });

            //если запросили не существующую рубрику сделаем 404
            if (currentRubrika && !isExistRubrika)
                self.$context.notFound();

            return {
                active: currentRubrika,
                list: tree
            };
        });
}

/**
 * Handles action named "some-action" from any component.
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
RubrikatorVideo.prototype.handleSomeAction = function () {
    // Here you can call this.$context.changed() if you know
    // that remote data source has been changed.
    // Also you can have many handle methods for other actions.
};
