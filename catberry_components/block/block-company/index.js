'use strict';

module.exports = BlockCompany;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "block-company" component.
 * @constructor
 */
function BlockCompany() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
BlockCompany.prototype.render = function () {
    var model = this.$context.attributes['cat-store'];
    var id = this.$context.attributes['id-block'];
    var index = this.$context.attributes['index'];

    if (model == 'rubrika/RubrikaCompany') {
        return this.$context.getStoreData()
            .then(function (data) {
                return data[index];
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
BlockCompany.prototype.bind = function () {

};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
BlockCompany.prototype.unbind = function () {

};
