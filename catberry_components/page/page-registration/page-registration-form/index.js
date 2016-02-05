'use strict';

module.exports = RegistrationForm;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "registration-form" component.
 * @constructor
 */
function RegistrationForm() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
RegistrationForm.prototype.render = function () {
    return {
        url: "/reg-master/success.json",
        urlLK: "404",
        method: "get"
    }
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
RegistrationForm.prototype.bind = function () {

};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
RegistrationForm.prototype.unbind = function () {

};
