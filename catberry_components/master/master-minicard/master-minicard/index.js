'use strict';

module.exports = MasterMinicard;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "master-minicard" component.
 * @constructor
 */
function MasterMinicard($serviceLocator) {
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
MasterMinicard.prototype.render = function () {
    var self = this;
    var store = self.$context.attributes['cat-store'];
    var id = self.$context.attributes['master-id'];
    var index = self.$context.attributes['index'];

    return this.$context.getStoreData()
        .then(function (data) {
            if (!data)
                return;
            if (store == 'company/CompanyItem') {
                return data.masters[index];
            }
            return data.list[index];
        })
        .then(function (master) {
            if (!master)
                return;
            if (master.page && (
                    (master.page.sales && master.sales[0]) ||
                    (master.page.albums && master.albums[0]) ||
                    (master.page.videos && master.videos[0]) ||
                    (master.page.comments && master.comments[0])
                )) {
                master.isWidget = true;
            }
            if (master.page && master.page.albums && master.albums) {
                master.albumsCount = master.albums.length;
                master.albumsTitle = [];
                master.albums.forEach(function (el) {
                    master.albumsTitle.push(el.name);
                });
                master.albumsTitle = master.albumsTitle.join(', ');
            }
            if (master.page && master.page.comments && master.comments) {
                master.commentsCount = master.comments.length;
            }
            var servicesNormally = [];
            Object.keys(master.services).forEach(function (item) {
                var service = master.services[item];
                service = service.replace(/\u00A0/g, " ");      //убираем неразрывный пробел
                service = service.replace(/:|\.|,/g, '$& ');    //вставляем пробелы после двоеточия, запятой и точки.
                servicesNormally.push(service);
            });
            master.services = servicesNormally;
            master.index = index;
            master.store = store;
            return master;
        });
};
MasterMinicard.prototype.bindFunctionCut = null;
MasterMinicard.prototype.bindFunctionWidget = null;

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
MasterMinicard.prototype.bind = function () {
    var width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

    this._minicardServicesCut();

    this.bindFunctionCut = this._minicardServicesCut.bind(this);
    this.bindFunctionWidget = this._minicardWidgetVisibility.bind(this);

    this._window.addEventListener('resize', this.bindFunctionCut);
    this._window.addEventListener('resize', this.bindFunctionWidget);

    // раскрываем первый активный элемент виджета
    if (width >= 750) {
        this._showFirstActWidget();
    }

    return {
        click: {
            '.js-services-toggle': this.handleShowService
        },
        mouseenter: {
            '.master-content-widget li': this.handleShowWidgetTab
        }
    };
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
MasterMinicard.prototype.unbind = function () {
    this._window.removeEventListener('resize');
    this._window.removeEventListener('resize', this.bindFunctionCut);
    this._window.removeEventListener('resize', this.bindFunctionWidget);
};


/**
 * Показывает боковой блок при наведении на иконку мышкой
 * @param event
 */
MasterMinicard.prototype.handleShowWidgetTab = function (event) {
    event.preventDefault();
    event.stopPropagation();
    var targetElement = event.currentTarget;

    if ($(targetElement).hasClass('act') && ($(window).width() >= 750)) {
        $(targetElement).siblings().removeClass('show');
        $(targetElement).addClass('show');
    }
};

/**
 * Раскрывает услуги при клике на кнопку мышкой
 * @param event
 * @returns {boolean}
 */
MasterMinicard.prototype.handleShowService = function (event) {
    event.preventDefault();
    event.stopPropagation();

    var btnDOM = this.$context.element.querySelector('.js-services-toggle');
    var minicardDOM = this.$context.element.querySelector('.master-minicard');
    var minicard = $(minicardDOM);
    minicard.find('.master-minicard__services').slideDown();
    if (minicard.hasClass('master-minicard_free')) {
        minicard.css('paddingBottom', '60px');
    }
    $(btnDOM).hide();
    minicard.find('.master-minicard__to-page').css('display', 'block');
    return false;
};

/**
 * Cut services.
 * @private
 */
MasterMinicard.prototype._minicardServicesCut = function () {
    var width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

    var carcas = this.$context.element.querySelector('.master-minicard');
    var services = this.$context.element.querySelector('.master-minicard__services');
    var name = this.$context.element.querySelector('.master-minicard__name');
    var spec = this.$context.element.querySelector('.master-minicard__spec');

    var servicesList = services.querySelectorAll('li');
    var servicesCount = servicesList.length;
    var maxHeight = carcas.offsetHeight - (name.offsetHeight + spec.offsetHeight + 20);

    if (width >= 500) {
        services.style.display = '';
        if (services.offsetHeight > maxHeight) {
            while (services.offsetHeight > maxHeight && servicesCount >= 0) {
                servicesList[servicesCount - 1].style.display = 'none';
                servicesCount--;
            }
        } else if ((services.offsetHeight + 10) < maxHeight) {
            var i = 0;
            while (services.offsetHeight < maxHeight && i < servicesCount) {
                servicesList[i].style.display = '';
                i++;
            }
            if (services.offsetHeight > maxHeight) {
                servicesList[i - 1].style.display = 'none';
            }
        }
    } else {
        services.style.display = 'none';
    }
};

/**
 * Отображает первый активный виджет
 * @private
 */
MasterMinicard.prototype._showFirstActWidget = function () {
    var act = this.$context.element.querySelector('.act');
    $(act).first().addClass('show');
};

/**
 * Widget visibility.
 * @private
 */
MasterMinicard.prototype._minicardWidgetVisibility = function () {
    var width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
    var widget = this.$context.element.querySelector('.master-content-widget');

    if (width >= 750) {
        $(widget).find('.act').first().addClass('show');
    } else {
        $(widget).find('li').removeClass('show');
    }
};

