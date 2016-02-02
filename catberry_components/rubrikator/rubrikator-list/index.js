'use strict';

module.exports = Catalog;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "catalog" component.
 * @constructor
 */
function Catalog() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
Catalog.prototype.render = function () {
    var self = this;
    return this.$context.getStoreData()
        .then(function (data) {
            return {
                rubrikator: data,
                catalog: self.$context.attributes.catalog
            }
        });
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
Catalog.prototype.bind = function () {
    return {
        click: {
            '.js-rubrika-list': this._clickHandler,
            '.js-rubrika-collapsed': this._clickAllHandler
        }
    }
};

Catalog.prototype._clickHandler = function (obj) {
    var el = obj.target;
    $(el).parents('.rubrika-list').find('.rubrika-list__list').toggle();
}

Catalog.prototype._clickAllHandler = function (obj) {
    var el = obj.target;
    var self = $(el).parents('.js-rubrika-collapsed');

    var cl = 'master-rubrikator-page';
    var cl_col = cl + '_collapsed';
    var el = $('.master-rubrikator-page');

    if (el.hasClass(cl_col)) {
        el.removeClass(cl_col);
        $('.rubrika-list__list').show();
        self.find('.rubrika-list__name').html('Свернуть все рубрики')
            .end().find('.rubrika-list__icon').addClass('rubrika-list__icon_rotate');
    } else {
        el.addClass(cl_col);
        $('.rubrika-list__list').hide();
        self.find('.rubrika-list__name').html('Развернуть все рубрики')
            .end().find('.rubrika-list__icon').removeClass('rubrika-list__icon_rotate');
    }
}
/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
Catalog.prototype.unbind = function () {

};


