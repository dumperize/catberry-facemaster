'use strict';

module.exports = Sale;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "sale" component.
 * @constructor
 */
function Sale() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
Sale.prototype.render = function () {
    return this.$context.getStoreData()
        .then(function (data) {
            //console.log(data[0].sale);
            return data;
        });
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
Sale.prototype.bind = function () {
    $('li.act:has(.act)').removeClass('act');

    var sale = $('.sale a');
    sale.bind('click', showSalePopup);

    function showSalePopup() {
        var tmp = $(this).parent().clone();
        tmp.addClass('popup');
        $.fancybox.open(tmp, {
            padding: 0,
            helpers: {
                overlay: {
                    locked: false
                }
            }
        });
        return false;
    }
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
Sale.prototype.unbind = function () {
    $('.sale a').unbind('click');
};
