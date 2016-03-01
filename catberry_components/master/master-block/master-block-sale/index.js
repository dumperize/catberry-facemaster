'use strict';

module.exports = MasterBlockSale;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "master-block-sale" component.
 * @constructor
 */
function MasterBlockSale() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
MasterBlockSale.prototype.render = function () {
    var self = this;
    return this.$context.getStoreData()
        .then(function (data) {
            //console.log(data);
            return {
                model: self.$context.attributes['cat-store'],
                sales: data.sales
            }
        });
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
MasterBlockSale.prototype.bind = function () {
    //var sale = $('.sale a');
    //sale.bind('click', showSalePopup);
    //
    //function showSalePopup() {
    //    var tmp = $(this).parent().clone();
    //    tmp.addClass('popup');
    //    $.fancybox.open(tmp, {
    //        padding: 0,
    //        helpers: {
    //            overlay: {
    //                locked: false
    //            }
    //        }
    //    });
    //    return false;
    //}
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
MasterBlockSale.prototype.unbind = function () {
    $('.sale a').unbind('click');
};
