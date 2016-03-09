'use strict';

module.exports = PageKonkurs;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "page-konkurs" component.
 * @constructor
 */
function PageKonkurs() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
PageKonkurs.prototype.render = function () {
    return this.$context.getStoreData()
        .then(function(data){
            data.forEach(function (item) {
                item.countMembers = Object.keys(item.activeMembers).length;
            });
            console.log(data[0]);
            return data;
        })
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
PageKonkurs.prototype.bind = function () {

};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
PageKonkurs.prototype.unbind = function () {

};
