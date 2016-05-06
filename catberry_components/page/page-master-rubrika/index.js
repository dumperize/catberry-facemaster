'use strict';

module.exports = PageMasterRubrika;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "page-master-rubrika" component.
 * @constructor
 */
function PageMasterRubrika() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
PageMasterRubrika.prototype.render = function () {
    return this.$context.getStoreData()
        .then(function (data) {
            if (data.rubrika.activeBanners) {
                data.rubrika.activeBanners.forEach(function (item) {
                    if (item.type == 2) {
                        item.imgID = item.imgID[0];
                    }
                    if (item.type == 1) {
                        data.topBanner = item;
                    }
                });
            }
            return data;
        });
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
PageMasterRubrika.prototype.bind = function () {
    $(window).bind('scroll', moneyrScroll);
    var moneyr = $('.moneyr-side');
    var moneyrHeight = moneyr.height();
    moneyrScroll();

    //плавающий moneyr
    function moneyrScroll() {
        var filter = $('.filter');
        var menuOffsetBottom = filter.offset().top + filter.height() + 20;
        var moneyrOffset = moneyr.offset();
        var seoText = $('.seo-text').offset() || $('.footer').offset();

        if (moneyr.hasClass('bottom') && ($(window).scrollTop() + 20 + moneyrHeight) > seoText.top) {
            return false;
        }
        if (($(window).scrollTop() + 20 >= moneyrOffset.top) && (moneyrOffset.top >= menuOffsetBottom)) {
            moneyr.addClass('fixed');
            if (($(window).scrollTop() + 20 + moneyrHeight) > seoText.top) {
                moneyr.addClass('bottom');
            }
        } else if (($(window).scrollTop() + 20 < moneyrOffset.top) && moneyr.hasClass('bottom')) {
            moneyr.removeClass('bottom');
            moneyr.addClass('fixed');
        }
        else {
            moneyr.removeClass('fixed');
        }
    }
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
PageMasterRubrika.prototype.unbind = function () {
    $(window).unbind('scroll');
};
