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
            return {
                model: self.$context.attributes['cat-store'],
                sales: data.sales
            }
        });
};
