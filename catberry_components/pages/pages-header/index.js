'use strict';

module.exports = PagesHeader;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "pages-header" component.
 * @constructor
 */
function PagesHeader() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
PagesHeader.prototype.render = function () {
    return this.$context.getStoreData()
        .then(function (data) {
            return data.header;
        })
        .then(function (d) {
            return d;
        })
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
PagesHeader.prototype.bind = function () {

};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
PagesHeader.prototype.unbind = function () {

};
