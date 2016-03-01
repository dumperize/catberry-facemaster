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
    this._salePopUpData = {};
}
Sale.prototype._salePopUpData = null;

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
                console.log(data.sales[index]);
                self._salePopUpData.id = 'popup-sale-' + data.sales[index].id;
                self._salePopUpData.imgid = data.sales[index].imgID;
                self._salePopUpData.type = data.sales[index].type;
                self._salePopUpData.text = data.sales[index].text;
                self._salePopUpData.discount = data.sales[index].discount;
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
    var self = this;
    return this.render()
        .then(function () {
            return {
                click: {
                    '.sale': self.handlePopUp
                }
            }
        });
};

Sale.prototype.handlePopUp = function (event) {
    var self = this;
    event.preventDefault();
    event.stopPropagation();

    self.$context.createComponent('block-sale-popup', self._salePopUpData)
        .then(function (data) {
            $.fancybox.open(data.innerHTML, {
                padding: 0,
                afterClose: function () {
                    self.$context.collectGarbage();
                }
            });
        });
    return false;
};
/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
Sale.prototype.unbind = function () {

};
