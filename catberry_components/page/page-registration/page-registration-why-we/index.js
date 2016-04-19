'use strict';

module.exports = RegistrationWhyWe;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "registration-why-we" component.
 * @constructor
 */
function RegistrationWhyWe() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
RegistrationWhyWe.prototype.render = function () {
    return {
        count: {
            master: "1 000",
            masterName: "мастеров<br>на сайте",
            visits: "12 000",
            orders: "1 000"
        }
    }
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
RegistrationWhyWe.prototype.bind = function () {

};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
RegistrationWhyWe.prototype.unbind = function () {

};
