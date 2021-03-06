'use strict';

module.exports = Video;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "video" component.
 * @constructor
 */
function Video() {
}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
Video.prototype.render = function () {
    var self = this;
    return this.$context.getStoreData()
        .then(function (data) {
            data.catalog = self.$context.attributes.catalog;
            //console.log(data);
            return data;
        });
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
Video.prototype.bind = function () {
    $(window).bind('resize', catalogItemCut);
    $('.catalog__menu-ico').bind('click', showCatalogMenu);

    catalogItemCut();
    function catalogItemCut() {
        if (window.matchMedia('(min-width: 750px)').matches) {
            $('.catalog__list').show();
        } else {
            $('.catalog__list').hide();
        }
        $('.catalog-item').each(function () {
            var text = $(this).find('.catalog-item__text'),                                           // контейнер с текстом
                textLineHeight = parseFloat(text.css('line-height')),                                 // высота строки
                wrapperHeight = parseInt($(this).find('.catalog-item__wrapper').css('max-height')),   // общая высотка обертки
                titleHeight = $(this).find('.catalog-item__title').height(),                          // высота заголовка
                titleMargin = parseFloat($(this).find('.catalog-item__title').css('margin-bottom')),
                cutTextHeight = Math.floor((wrapperHeight - titleHeight - titleMargin) / textLineHeight) * Math.floor(textLineHeight);

            text.css('height', 'auto');
            if (text.height() > cutTextHeight) {
                text.height(cutTextHeight);
            }
        });
    }

    function showCatalogMenu() {
        $('.catalog__list').slideToggle(400);
    }
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
Video.prototype.unbind = function () {
    $('.catalog__menu-ico').unbind('click');
    $(window).unbind('resize');
};
