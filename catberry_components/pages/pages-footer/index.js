'use strict';

module.exports = Footer;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "pages-footer" component.
 * @constructor
 */
function Footer() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
Footer.prototype.render = function () {
    return this.$context.getStoreData()
        .then(function (data) {
            data.footer.links = [
                {
                    "url": "/oferta",
                    "title": "Оферта"
                },
                {
                    "url": "/contact",
                    "title": "Контакты"
                },
                {
                    "url": "/feedback",
                    "title": "Обратная связь"
                }
            ];
            return data.footer;
        });
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
Footer.prototype.bind = function () {
    var windowHeight = $(window).height();
    $('#to-top a').bind('click', scrollToTop);
    $(window).bind('scroll', isVisibleToTop);

    function scrollToTop() {
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
        return false;
    }

    function isVisibleToTop() {
        if (windowHeight / 2 > $(window).scrollTop()) {
            $('#to-top').fadeOut(400);
            $('.kl').fadeOut(400);
        } else {
            $('#to-top').fadeIn(400);
            //$('.kl').fadeIn(400);
        }
    }
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
Footer.prototype.unbind = function () {
    $('#to-top a').unbind('click');
    $(window).unbind('scroll');
};
