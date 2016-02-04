'use strict';

module.exports = CompanyRubrika;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "company-rubrika" component.
 * @constructor
 */
function CompanyRubrika() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
CompanyRubrika.prototype.render = function () {
    return this.$context.getStoreData()
        .then(function (data) {
            //console.log(data);
            return data;
        });
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
CompanyRubrika.prototype.bind = function () {

};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
CompanyRubrika.prototype.unbind = function () {

};
