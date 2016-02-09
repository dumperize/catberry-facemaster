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
            data.rubrika.activeBanners.forEach(function (item) {
                item.imgID = JSON.parse(item.imgID);
                if (item.type == 2) {
                    item.imgID = item.imgID[0];
                }
                //console.log(item);
            });
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
    var moneyrOffset = moneyr.offset();
    var moneyrHeight = moneyr.height();

    //плавающий moneyr
    function moneyrScroll() {
        if ($(window).scrollTop() + 20 > moneyrOffset.top) {
            moneyr.addClass('fixed');
            if (($(window).scrollTop() + 40 + moneyrHeight) > $('.seo-text').offset().top) {
                moneyr.addClass('bottom');
            } else {
                moneyr.removeClass('bottom');
            }
        } else {
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
