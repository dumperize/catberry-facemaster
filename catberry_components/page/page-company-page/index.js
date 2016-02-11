'use strict';

module.exports = PageCompanyPage;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "page-company-page" component.
 * @constructor
 */
function PageCompanyPage() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
PageCompanyPage.prototype.render = function () {
    return this.$context.getStoreData()
        .then(function(data) {
            console.log(data);
            return data;
        });
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
PageCompanyPage.prototype.bind = function () {

    var menu = $('.menu-mp');
    var menuOffset = menu.offset();

    $(window).bind('scroll', fixedSectionMenu);
    $(window).bind('scroll', menuHighlight);
    $('.menu-mp a').bind('click', scrollToSection);

    //плавающего меню
    function fixedSectionMenu() {
        if ($(window).scrollTop() + 30 > menuOffset.top) {
            menu.addClass('fixed');
        } else {
            menu.removeClass('fixed');
        }
    }

    //скролл до секции
    function menuHighlight() {
        $('.company-page__section-cont').each(function () {
            if ($(window).scrollTop() + 50 > $(this).offset().top && $(window).scrollTop() + 30 < $(this).offset().top + $(this).innerHeight()) {
                menu.find('.act').removeClass('act');
                menu.find('[href=#' + $(this).children().attr('id') + ']').addClass('act');
            }
        });
    }

    //навигации внутри страницы мастера
    function scrollToSection() {
        $(window).unbind('scroll', menuHighlight);
        setTimeout(function () {
            $(window).bind('scroll', menuHighlight);
        }, 1050);
        menu.find('.act').removeClass('act');
        $(this).addClass('act');
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 50
        }, 1000);
        return false;
    }
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
PageCompanyPage.prototype.unbind = function () {
    $(window).unbind('scroll');
    $('.menu-mp').find('a').unbind('click');
};
