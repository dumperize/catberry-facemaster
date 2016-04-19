'use strict';

module.exports = RegistrationPrice;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "registration-price" component.
 * @constructor
 */
function RegistrationPrice() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
RegistrationPrice.prototype.render = function () {

};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
RegistrationPrice.prototype.bind = function () {
    return {
        click: {
            '.tab-content__name': this._clickHandle
        }
    }
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
RegistrationPrice.prototype.unbind = function () {

};

RegistrationPrice.prototype._clickHandle = function (obj) {
    var el = $(obj.target);
    if (!el.hasClass('tab-content__name'))
        el = el.parents('.tab-content__name');

    var parent = el.parents('.tab-content');
    if (parent.hasClass('tab-content_active'))
        return;
    $('.tab-content_active').removeClass('tab-content_active');
    parent.addClass('tab-content_active');
};
