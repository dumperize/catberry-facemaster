'use strict';

module.exports = MasterPage;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "master-page" component.
 * @constructor
 */
function MasterPage() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
MasterPage.prototype.render = function () {
    return this.$context.getStoreData().then(function (data) {
        console.log(data.company);
        return data;
    });
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
MasterPage.prototype.bind = function () {
    var offset = $('.menu-mp').offset();
    $(window).bind('scroll', function () {
        if ($(window).scrollTop() + 30 > offset.top) {
            $('.menu-mp').addClass('fixed');
        } else {
            $('.menu-mp').removeClass('fixed');
        }
    });
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
MasterPage.prototype.unbind = function () {
    $(window).unbind('scroll');
};
