'use strict';

module.exports = PageContact;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "page-contact" component.
 * @constructor
 */
function PageContact() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
PageContact.prototype.render = function () {
    return {
        "phone": "(8482) 741-147",
        "email": "info@facemaster.ru",
        "adress": "г. Тольятти, ул. Автостроителей 41А-1"
    }
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
PageContact.prototype.bind = function () {

};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
PageContact.prototype.unbind = function () {

};
