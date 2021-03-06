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
}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
CommonList.prototype.render = function () {
    var self = this;

    return this.$context.getStoreData()
        .then(function(data){
            return {
                isFinished: data.isFinished,
                list: data.list,
                type: self.$context.attributes.type,
                model: self.$context.attributes['cat-store']
            }
        });
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
CommonList.prototype.bind = function () {
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
CommonList.prototype.unbind = function () {

};
