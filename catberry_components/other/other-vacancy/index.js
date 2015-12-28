'use strict';

module.exports = OtherVacancy;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "other-vacancy" component.
 * @constructor
 */
function OtherVacancy() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
OtherVacancy.prototype.render = function () {
    return this.$context.getStoreData()
        .then (function (res) {
        return {
            vacancy: res
        }
    });
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
OtherVacancy.prototype.bind = function () {

};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
OtherVacancy.prototype.unbind = function () {

};
