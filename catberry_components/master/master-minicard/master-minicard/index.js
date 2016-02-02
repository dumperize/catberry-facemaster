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
function MasterMinicard() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
MasterMinicard.prototype.render = function () {
    var self = this;
    return this.$context.getStoreData()
        .then(function (data) {
            if (!data)
                return;
            var masterID = self.$context.attributes['master-id'];
            for (var i = 0; i < data.length; ++i) {
                if (data[i].id == masterID) {
                    return data[i];
                }
            }
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
            Object.keys(master.services).forEach(function (item, i, arr) {
                var service = master.services[item];
                service = service.replace(/\u00A0/g, " ");
                servicesNormally.push(service);
            });
            master.services = servicesNormally;
            //console.log(master);
            return master;
        });
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
MasterMinicard.prototype.bind = function () {
    var minicardComp = $('#' + this.$context.element.id);
    minicardComp.find('.master-content-widget li').bind('mouseenter', showWidgetTab);
    minicardComp.find('.js-services-toggle').bind('click', showServices);

    function showWidgetTab() {
        if ($(this).hasClass('act') && ($(window).width() >= 750)) {
            $(this).siblings().removeClass('show');
            $(this).addClass('show');
        }
    }
    function showServices() {
        var minicard = $(this).closest('.master-minicard');
        minicard.find('.master-minicard__services').slideDown();
        if (minicard.hasClass('master-minicard_free')) {
            minicard.css('paddingBottom', '60px');
        }
        $(this).hide();
        minicard.find('.master-minicard__to-page').css('display', 'block');
        //console.log('done!');
        return false;
    }
    // раскрываем первый активный элемент виджета
    if ($(window).width() >= 750) {
        this._showFirstActWidget();
    }
    return {};
};
MasterMinicard.prototype._showFirstActWidget = function () {
    $('#' + this.$context.element.id).find('.act').first().addClass('show');
};
/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
MasterMinicard.prototype.unbind = function () {
    $('.master-content-widget li').unbind('mouseenter');
};
