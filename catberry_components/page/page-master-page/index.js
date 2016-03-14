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

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
PageMasterPage.prototype.render = function () {
    return this.$context.getStoreData();
};

PageMasterPage.prototype._menuOffset = null;
/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
PageMasterPage.prototype.bind = function () {
    //функции для jquery работающие с window
    this.function = {
        fixedSectionMenu: this.fixedSectionMenu.bind(this),
        menuHighlight: this.menuHighlight.bind(this),
        scrollToSection: this.scrollToSection.bind(this)
    };
    //запомним базовое расположение блока меню
    this._menuOffset = $('.menu-mp').offset().top;

    //навесим обработчики для объекта window
    $(window).bind('scroll', this.function.fixedSectionMenu);
    $(window).bind('scroll', this.function.menuHighlight);

    //установим блок на след пред мастера
    this.setNextPrev();
    //активизируем правильную позицию блока  меню
    this.fixedSectionMenu();
    //подсветим правильный блок
    this.menuHighlight();

    //вернем все обработчики событий
    return {
        click: {
            '.js-show-callback-popup': this.showCallbackPopup,
            '.contacts-mp__show-contact': this.showContacts,
            '.menu-mp a': this.function.scrollToSection
        }
    }
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
PageMasterPage.prototype.unbind = function () {
    $(window).unbind('scroll');
    this.$context.collectGarbage();
};

/**
 * скролл до секции
 * @param event
 */
PageMasterPage.prototype.menuHighlight = function (event) {
    var menu = $('.menu-mp');
    $('.master-page__section-cont').each(function () {
        if ($(window).scrollTop() + 50 > $(this).offset().top &&
            $(window).scrollTop() + 30 < $(this).offset().top + $(this).innerHeight()) {
            menu.find('.act').removeClass('act');
            menu.find('[href=#' + $(this).children().attr('id') + ']').addClass('act');
        }
    });
};

/**
 * навигации внутри страницы мастера
 * @returns {boolean}
 */
PageMasterPage.prototype.scrollToSection = function (event) {
    event.preventDefault();
    event.stopPropagation();

    var menu = $('.menu-mp');
    var self = this;

    //удалим все классы act из меню
    menu.find('.act').removeClass('act');
    //выключим подсветку при авто прокрутке, а после включим ее
    $(window).unbind('scroll', this.function.menuHighlight);
    setTimeout(function () {
        $(window).bind('scroll', self.function.menuHighlight);
    }, 1050);

    var target = event.target || event.srcElement;
    var targetJquery = $(target);
    var targetJqueryID = targetJquery.attr('href');

    targetJquery.addClass('act');
    $('html, body').animate({
        scrollTop: $(targetJqueryID).offset().top - 50
    }, 1000);
};

/**
 * плавающего меню
 * @param event
 */
PageMasterPage.prototype.fixedSectionMenu = function (event) {
    var menu = $('.menu-mp');
    if ($(window).scrollTop() + 30 > this._menuOffset) {
        menu.addClass('fixed');
    } else {
        menu.removeClass('fixed');
    }
};

/**
 * показать контакты
 * @param event
 */
PageMasterPage.prototype.showContacts = function (event) {
    event.preventDefault();
    event.stopPropagation();
    this.$context.element.querySelector('.contacts-mp__cap').style.display = 'none';
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
        'master-id': self.$context.element.querySelector('.master-page').getAttribute('master-id')
    })
        .then(function (data) {
            $.fancybox.open('<div id="popup_callback"></div>', {
                padding: 0,
                type: 'inline',
                minWidth: '250px',
                autoHeight: true,
                autoSize: true,
                afterShow: function () {
                    var popup = document.getElementById('popup_callback');
                    popup.insertBefore(data, popup.children[0]);
                },
                afterClose: function () {
                    self.$context.collectGarbage();
                }
            });
        });

    return false;
};

/**
 * Установим блок след пред мастера
 */
PageMasterPage.prototype.setNextPrev = function () {
    var self = this;
    this.$context.createComponent('master-next-prev', {
        id: "next-prev",
        'cat-store': "master/MasterNextPrev"
    })
        .then(function (dom) {

            var domBlock = self.$context.element.querySelector('#next-prev-master');
            if (domBlock && dom)
                domBlock.innerHTML = dom.innerHTML;
        })

};
