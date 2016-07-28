'use strict';

module.exports = MasterMinicard;
//var Typograf = require('typograf');

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
    //this.tp = new Typograf({lang: 'ru'});
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
            if (!master) return;

            //console.log(master.services);
            master.isWidget = (master.publication && (
                (master.publication.sales && master.sales[0]) ||
                (master.publication.albums && master.albums[0]) ||
                (master.publication.videos && master.videos[0]) ||
                (master.publication.comments && master.comments[0])
            ));

            if (master.publication && master.publication.albums && master.albums) {
                master.albumsCount = master.albums.length;
                master.albumsTitle = [];
                master.albums.forEach(function (el) {
                    master.albumsTitle.push(el.name);
                });
                master.albumsTitle = master.albumsTitle.join(', ');
            }
            if (master.publication && master.publication.comments && master.comments) {
                master.commentsCount = master.comments.length;
            }
            var servicesNormally = [];
            // если есть поисковая выдача заводим переменную servHightlight
            // console.log(master.highlight);
            if (master.highlight) {
                var servHightlight = master.highlight.services;
                var findText = [];
                // бесплатникам заменяем специализацию на найденное значение в хайлайтах
                if (master.publication && !master.publication.page && master.highlight.rubrikaName) {
                    master.spec = master.highlight.rubrikaName;
                }
                Object.keys(master.highlight).forEach(function (item) {
                    if (item != 'services' && item != 'name' && item != 'spec') {
                        findText[0] = '<p class="find-text"><strong>Текст найден на странице мастера:</strong><br>'
                            + master.highlight[item][0] + '</p>';
                        //return false;
                    }
                    if (item == 'name' || item == 'spec') {
                        var highlight = master.highlight[item][0];
                        while (highlight.indexOf('<em>') > -1) {
                            var findStr = highlight.slice(highlight.indexOf('<em>') + 4, highlight.indexOf('</em>'));
                            var re = new RegExp(findStr, 'g');
                            highlight = highlight.slice(0, highlight.indexOf('<em>')) + highlight.slice(highlight.indexOf('</em>') + 5);
                            if (item == 'name') {
                                master.name = master.name.replace(re, '<em>' + findStr + '</em>');
                            } else {
                                master.spec = master.spec.replace(re, '<em>' + findStr + '</em>');
                            }
                        }
                    }
                });
            }
            if (master.services) {
                var i = 0;
                Object.keys(master.services).forEach(function (item) {
                    var service = master.services[item];
                    // если для сервайсов есть хайлайты
                    if (servHightlight) {
                        servHightlight.forEach(function (item2) {
                            // заменяем в сервайсах все вхождения из хайлайтов
                            while (item2.indexOf('<em>') > -1) {
                                var findStr = item2.slice(item2.indexOf('<em>') + 4, item2.indexOf('</em>'));
                                var re = new RegExp(findStr, 'g');
                                service = service.replace(re, '<em>' + findStr + '</em>');
                                item2 = item2.slice(0, item2.indexOf('<em>')) + item2.slice(item2.indexOf('</em>') + 5);
                            }
                        });
                        // копируем строки с вхождениями на позицию i в массиве servicesNormally (вверх)
                        if (service.indexOf('<em>') > -1) {
                            servicesNormally.push(servicesNormally[i] ? servicesNormally[i] : service);
                            servicesNormally[i] = service;
                            i++;
                        } else {
                            servicesNormally.push(service);
                        }
                    } else {
                        servicesNormally.push(service);
                    }
                    //service = self.tp.execute(service);
                });
                if (findText && !servHightlight && master.publication && master.publication.page) {
                    // избегаем дублирования плашки "Текст найден на странице мастера:"
                    if (!servicesNormally[0] || (servicesNormally[0] && servicesNormally[0].indexOf('find-text') == -1)) {
                        servicesNormally = findText.concat(servicesNormally);
                    }
                }
                master.services = servicesNormally;
            }
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
    this.bindFunctionCut = this._minicardServicesCut.bind(this);
    this.bindFunctionWidget = this._minicardWidgetVisibility.bind(this);

    this._window.addEventListener('resize', this.bindFunctionCut);
    this._window.addEventListener('resize', this.bindFunctionWidget);


    var width = document.documentElement.clientWidth
        || document.body.clientWidth
        || window.innerWidth;
    this._minicardServicesCut();
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
    var width = document.documentElement.clientWidth
        || document.body.clientWidth
        || window.innerWidth;

    if ($(targetElement).hasClass('act') && (width >= 750)) {
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
    var width = document.documentElement.clientWidth
        || document.body.clientWidth
        || window.innerWidth;

    var carcas = this.$context.element.querySelector('.master-minicard');
    var services = this.$context.element.querySelector('.master-minicard__services');
    var name = this.$context.element.querySelector('.master-minicard__name');
    var spec = this.$context.element.querySelector('.master-minicard__spec');

    if (!services) {
        return;
    }

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
    var width = document.documentElement.clientWidth
        || document.body.clientWidth
        || window.innerWidth;
    var widget = this.$context.element.querySelector('.master-content-widget');

    if (width >= 750) {
        $(widget).find('.act').first().addClass('show');
    } else {
        $(widget).find('li').removeClass('show');
    }
};

