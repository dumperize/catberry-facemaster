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
    return this.$context.getStoreData()
        .then(function (data) {
            if (!data.contacts.addrCoord || data.contacts.addrCoord == '') {
                if (!data.contacts.addr || data.contacts.addr == '') {
                    data.contacts.addr = 'Тольятти';
                }
                data.contacts.addrCoord = encodeURIComponent(data.contacts.addr);
            }
            return data;
        });
};

PageMasterPage.prototype._menuOffset = null;
/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
PageMasterPage.prototype.bind = function () {
    window.scrollTo(0,0);

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
    $(window).bind('resize', this.function.fixedSectionMenu);
    $(window).bind('scroll', this.function.menuHighlight);
    $(window).bind('resize', this.function.menuHighlight);

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
            '.menu-mp a': this.function.scrollToSection,
            '.js-show-map': this._showMap
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
    $(window).unbind('resize');
    this.$context.collectGarbage();
};

PageMasterPage.prototype._showMap = function (e) {
    e.preventDefault();

    var coord = e.currentTarget.getAttribute('data-coord');
    var iframe = '<div class="map-cont"><iframe frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=' + coord + '&key=AIzaSyC14driclnh9TFQ9_1NJOk_rOxtgiptvnw" allowfullscreen></iframe></div>'

    $.fancybox(iframe, {
        margin: 40,
        padding: 0,
        type: 'inline',
        width: '80%',
        height: '80%',
        maxWidth: '800px',
        minWidth: '250px',
        autoHeight: true,
        autoSize: false
    });
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
    var menuScrollTop = $(window).scrollTop();
    if (this._menuOffset == 0) {
        menu.removeClass('fixed');
        this._menuOffset = menu.offset().top;
    }
    if (menuScrollTop + 30 > this._menuOffset) {
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
    this.$context.element.querySelector('.contacts-mp__list').style.display = 'block';
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
