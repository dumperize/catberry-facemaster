'use strict';

module.exports = Breadcrumps;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "breadcrumps" component.
 * @constructor
 */
function Breadcrumps() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
Breadcrumps.prototype.render = function () {
    return this.$context.getStoreData();
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
Breadcrumps.prototype.bind = function () {
    return {
        click: {
            '.js-parent-rub': this._clickHandler
        }
    }
};


Breadcrumps.prototype._clickHandler = function (event) {
    //var el = obj.target;
    var parentRub = $('.js-parent-rub');
    var pos = parentRub.position().left + parentRub.width() + $('.breadcrumbs__icon').width();
    event.preventDefault();
    event.stopPropagation();
    $('.js-breadcrumbs-list').css('left', pos).toggle();
    return false;
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
Breadcrumps.prototype.unbind = function () {

};
