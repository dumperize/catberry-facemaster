'use strict';


module.exports = RubrikatorVideo;

var RubrikaFormat = require('../../lib/util/RubrikaFormat');
var util = require('util'),
    StoreBase = require('../../lib/StoreBase');

/**
 * наследуемся от пагинатора для базового стора
 */
util.inherits(RubrikatorVideo, StoreBase);

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
    StoreBase.call(this);

    this._path = '/video/rubriks';
    this._options = {
        data: {}
    };
    //this._options = {
    //    data: {
    //        filter: '["and",["=", "status", "1"]]',
    //        expand: 'videoCount',
    //        order: 'sort',
    //        limit: 300
    //    }
    //};
}

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
RubrikatorVideo.prototype.load = function () {
    var self = this;
    var currentRubrika = this.$context.state.catalog;

    return this._load()
        .then(function (result) {

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
};