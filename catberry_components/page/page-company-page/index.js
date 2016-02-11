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
function PageCompanyPage($serviceLocator) {
// we can use window from the locator in a browser only
    if (this.$context.isBrowser) {
        this._window = $serviceLocator.resolve('window');
    }
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
            //console.log(data);
            return data;
        });
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
PageCompanyPage.prototype.bind = function () {
    this._window.addEventListener('resize', this._allMinicardServicesCut);
    this._window.addEventListener('resize', this._allMinicardWidgetVisibility);

    setTimeout(this._allMinicardServicesCut, 200);

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

    this._window.removeEventListener('resize', this._allMinicardServicesCut);
    this._window.removeEventListener('resize', this._allMinicardWidgetVisibility);
};

/**
 * Cut services.
 * @private
 */
PageCompanyPage.prototype._allMinicardServicesCut = function () {
    if ($(window).width() >= 500) {
        $('.master-minicard__services').show();
        $('.master-minicard').each(function () {
            var minicardServices = $(this).find('.master-minicard__services');
            var servicesList = minicardServices.find('li');
            var maxHeight =
                $(this).height() - ($(this).find('.master-minicard__name').height() + $(this).find('.master-minicard__spec').height() + 20);
            var servicesCount = minicardServices.find('li').length;

            if (minicardServices.height() > maxHeight) {
                while (minicardServices.height() > maxHeight && servicesCount >= 0) {
                    $(servicesList[servicesCount - 1]).hide();
                    servicesCount--;
                }
            } else if ((minicardServices.height() + 10) < maxHeight) {
                var i = 0;
                while (minicardServices.height() < maxHeight && i < servicesCount + 1) {
                    $(servicesList[i]).show();
                    i++;
                }
                if (minicardServices.height() > maxHeight) {
                    $(servicesList[i - 1]).hide();
                }
            }
        });
    } else {
        $('.master-minicard__services').hide();
    }
    //console.log('done!');
};
/**
 * Widget visibility.
 * @private
 */
PageCompanyPage.prototype._allMinicardWidgetVisibility = function () {
    if ($(window).width() >= 750) {
        $('.master-content-widget').each(function () {
            $(this).find('.act').first().addClass('show');
        });
    } else {
        $('.master-content-widget li').removeClass('show');
    }
};
