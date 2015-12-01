'use strict';

module.exports = DopCatalogs;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "dop-catalogs" component.
 * @constructor
 */
function DopCatalogs() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
DopCatalogs.prototype.render = function () {

    return {
        'data-mod': this.$context.attributes['data-mod'],
        catalogs: [
            {
                url: "/sale",
                icon: "gift",
                title: "Поиск по скидке"
            },
            {
                url: "/video",
                icon: "video",
                title: "Поиск по видео"
            },
            {
                url: "/sovety",
                icon: "qwestion",
                title: "Секреты Мастеров"
            },
            {
                url: "/company",
                icon: "case",
                title: "Каталог фирм"
            }
        ]
    };
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
DopCatalogs.prototype.bind = function () {

};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
DopCatalogs.prototype.unbind = function () {

};
