'use strict';

module.exports = CommonList;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "common-list" component.
 * @constructor
 */
function CommonList() {
    this._data = [];
}
CommonList.prototype._data = null;
/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
CommonList.prototype.render = function () {
    return this.$context.getStoreData();
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
CommonList.prototype.bind = function () {
    var self = this;
    this._data = this.$context.getStoreData();
    this._data.then(function (data) {
        var promises = data.map(function (el) {
            return self.$context.createComponent('block-video', {
                id: "block-video-" + el.id,
                'id-block': el.id,
                'cat-store': 'video/VideoList'
            })
        });
        Promise.all(promises)
            .then(function (d) {
                var div = document.getElementById('suda');
                d.forEach(function (block) {
                    console.log(block);
                    div.text += block;
                });
            });
    })
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
CommonList.prototype.unbind = function () {

};
