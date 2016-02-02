'use strict';

module.exports = MasterRecommended;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "master-recommended" component.
 * @constructor
 */
function MasterRecommended() {

}

/**
 * Gets data context for template engine.
 * This method
 "is-recommended-masters": true, is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
MasterRecommended.prototype.render = function () {
    return this.$context.getStoreData()
        .then(function (data) {
            return {
                list: data,
                length: (data.length > 1)
            }
        });

};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
MasterRecommended.prototype.bind = function () {
    this.bindSlick();
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
MasterRecommended.prototype.unbind = function () {
    this.unbindSlick();
};

MasterRecommended.prototype.bindSlick = function () {
    $('.master_recommended__slider').slick({
        dots: false,
        infinite: false,
        speed: 700,
        slidesToShow: 4,
        slidesToScroll: 3,
        prevArrow: '<div class="slick-prev">' +
        '<svg class="icon icon_strelka" title="icon_strelka" role="img">' +
        '<use xlink:href="/icon-svg/svg-symbols.svg#icon_strelka"/>' +
        '</svg>' +
        '</div>',
        nextArrow: '<div class="slick-next">' +
        '<svg class="icon icon_strelka" title="icon_strelka" role="img">' +
        '<use xlink:href="/icon-svg/svg-symbols.svg#icon_strelka"/>' +
        '</svg>' +
        '</div>'
    });
};
MasterRecommended.prototype.unbindSlick = function () {
    $('.master_recommended__slider').slick("unslick");
};