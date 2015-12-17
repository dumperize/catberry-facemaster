'use strict';

module.exports = CommonPaginator;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "common-paginator" component.
 * @constructor
 */
function CommonPaginator() {
}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
CommonPaginator.prototype.render = function () {
    var self = this;
    var model = this.$context.attributes.model;
    if (!model)
        return {
            "is-paginator": false
        };

    return this.$context.sendAction("setModel", model)
        .then(function () {
            return self.$context.getStoreData();
        });
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
CommonPaginator.prototype.bind = function () {
    return {
        click: {
            '.paginator__number': this._handleClick
        }
    }
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
CommonPaginator.prototype.unbind = function () {

};
CommonPaginator.prototype._handleClick = function(){
    window.scrollTo(0,0);
};