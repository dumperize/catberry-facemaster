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
    var self = this;
    var model = this.$context.attributes['cat-store'];
    var id = this.$context.attributes['id-block'];
    var index = this.$context.attributes['index'];

    return this.$context.getStoreData()
        .then(function (data) {
            if (model == 'master/MasterItem') {
                return data.sales[index];
            }

            if (model == 'sale/SaleByRubrika') {
                var num = self.$context.attributes['num'];
                var sale = data[num].sale[index];
                sale.page = sale.owner.page;
                return sale;
            }
            return data.list[index];
        });

};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
Sale.prototype.bind = function () {

};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
Sale.prototype.unbind = function () {

};
