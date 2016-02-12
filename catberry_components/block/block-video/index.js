'use strict';

module.exports = Video;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "video" component.
 * @constructor
 */
function Video() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
Video.prototype.render = function () {
    var model = this.$context.attributes['cat-store'];
    var id = this.$context.attributes['id-block'];
    var index = this.$context.attributes['index'];

    if (model == 'master/MasterItem') {
        return this.$context.getStoreData()
            .then(function (data) {
                return data.videos[index];
            });
    }
    return this.$context.getStoreData()
        .then(function (data) {
            return data.list[index];
        });
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
Video.prototype.bind = function () {
//навесить клик и тут сделать createComponent дальше вызвать метод генерирующий массив для передачи и запилить все
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
Video.prototype.unbind = function () {

};


