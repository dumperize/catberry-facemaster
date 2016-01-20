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
            //console.log(Object.keys(master.services));
            return master;
        });
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
MasterMinicard.prototype.bind = function () {
    $('.master-content-widget li').bind('mouseenter', showWidgetTab);

    $('.master-content-widget').each(function () {
        $(this).find('.act').first().addClass('show');
    });
    function showWidgetTab() {
        if ($(this).hasClass('act')) {
            $(this).siblings().removeClass('show');
            $(this).addClass('show');
        }
    }

    this._minicardServicesCut();
    return {};
};
MasterMinicard.prototype._minicardServicesCut = function () {
    var minicard = $('#' + this.$context.element.id);
    var minicardServices = minicard.find('.master-minicard__services');
    var maxHeight =
        minicard.find('.master-minicard').height() - (minicard.find('.master-minicard__name').height() + minicard.find('.master-minicard__spec').height());
    var servicesCount = minicardServices.find('li').length;

    while (minicardServices.height() > maxHeight && servicesCount != 0) {
        $(minicardServices.find('li')[servicesCount]).hide();
        servicesCount--;
    }
};
/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
MasterMinicard.prototype.unbind = function () {
    $('.master-content-widget li').unbind('mouseenter');
};
