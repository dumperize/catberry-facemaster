'use strict';

module.exports = PageMasterPage;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "page-master-page" component.
 * @constructor
 */
function PageMasterPage() {

}

PageMasterPage.prototype.masterID = null
/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
PageMasterPage.prototype.render = function () {
    var self = this;
    return this.$context.getStoreData()
        .then(function (data) {
            self.masterID = data.id;
            return data;
        });
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
PageMasterPage.prototype.bind = function () {
    var menu = $('.menu-mp');
    var menuOffset = menu.offset();
    var ta = $('textarea');

    $(window).bind('scroll', fixedSectionMenu);
    $(window).bind('scroll', menuHighlight);
    $('.menu-mp a').bind('click', scrollToSection);
    $('.contacts-mp__show-contact').bind('click', showContact);
    autosize(ta);
    fixedSectionMenu();
    menuHighlight();

    //показать контакты
    function showContact() {
        $(this).closest('.contacts-mp__cap').hide();
        return false;
    }

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
        $('.master-page__section-cont').each(function () {
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

    return {
        click: {
            '.js-show-callback-popup': this.showCallbackPopup
        }
    }
};

/**
 * показать popup - заказать звонок
 * @returns {boolean}
 */
PageMasterPage.prototype.showCallbackPopup = function (event) {
    var self = this;
    event.preventDefault();
    event.stopPropagation();

    this.$context.createComponent('block-callback-request-popup', {
        id: 'callback-request-popup',
        'cat-store': 'master/MasterCallBackRequest',
        'master-id': self.masterID
    })
        .then(function (data) {
            $.fancybox.open('<div id="popup_callback"></div>', {
                margin: 40,
                padding: 20,
                type: 'inline',
                width: '80%',
                maxWidth: '800px',
                minWidth: '250px',
                autoHeight: true,
                autoSize: false,
                afterShow: function () {
                    var popup = document.getElementById('popup_callback');
                    popup.insertBefore(data,popup.children[0]);
                },
                afterClose: function () {
                    self.$context.collectGarbage();
                }
            });
        });

    //var form = $('#callback-request-popup .callback-popup');
    //$.fancybox.open(form, {
    //    padding: 0
    //});
    return false;
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
PageMasterPage.prototype.unbind = function () {
    var ta = document.querySelector('textarea');
    var evt = document.createEvent('Event');

    $(window).unbind('scroll');
    $('.menu-mp').find('a').unbind('click');
    $('.contacts-mp__show-contact').unbind('click');
    $('.js-show-callback-popup').unbind('click');
    evt.initEvent('autosize:destroy', true, false);
    ta.dispatchEvent(evt);
};
