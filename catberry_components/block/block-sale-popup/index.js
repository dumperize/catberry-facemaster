'use strict';

module.exports = BlockSalePopup;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "block-sale-popup" component.
 * @constructor
 */
function BlockSalePopup() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
BlockSalePopup.prototype.render = function () {
    //console.log(this.$context.attributes);
    var self = this;
    return this.$context.sendAction('setMasterID', this.$context.attributes['masterid'])
        .then(function (data) {
            var popUpData = self.$context.attributes;
            popUpData.name = data.name;
            popUpData.number = data.number;
            popUpData.imgid2 = data.imgID;
            return popUpData;
        });

};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
BlockSalePopup.prototype.bind = function () {

};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
BlockSalePopup.prototype.unbind = function () {

};
