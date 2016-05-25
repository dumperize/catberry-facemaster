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
                sale.publication = sale.owner.publication;

                self._salePopUpData.id = 'popup-sale-' + data[num].sale[index].id;
                self._salePopUpData.imgid = data[num].sale[index].imgID;
                self._salePopUpData.type = data[num].sale[index].type;
                self._salePopUpData.text = data[num].sale[index].text;
                self._salePopUpData.discount = data[num].sale[index].discount;

                self._salePopUpData.name = sale.owner.name;
                self._salePopUpData.number = sale.owner.publication.number;
                self._salePopUpData.imgid2 = sale.owner.imgID;
                return sale;
            }
            self._salePopUpData.id = 'popup-sale-' + data.list[index].id;
            self._salePopUpData.imgid = data.list[index].imgID;
            self._salePopUpData.type = data.list[index].type;
            self._salePopUpData.text = data.list[index].text;
            self._salePopUpData.discount = data.list[index].discount;

            self._salePopUpData.name = data.list[index].owner.name;
            self._salePopUpData.number = data.list[index].owner.publication.number;
            self._salePopUpData.imgid2 = data.list[index].owner.imgID;
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
                minWidth: '250px',
                afterClose: function () {
                    self.$context.collectGarbage();
                }
            });
        });
    return false;
};
