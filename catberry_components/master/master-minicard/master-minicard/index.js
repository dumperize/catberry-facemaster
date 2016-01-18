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

            if (master.page && (master.page.sales || master.page.albums || master.page.videos || master.page.comments)) {
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
            return master;
        });
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
MasterMinicard.prototype.bind = function () {
    this._minicardServicesCut();
    return {};
};
MasterMinicard.prototype._minicardServicesCut = function () {
    var minicard = $('#' + this.$context.element.id);
    var minicardServices = minicard.find('.master-minicard__services');
    var maxHeight =
        minicard.find('.master-minicard').height() - (minicard.find('.master-minicard__name').height() + minicard.find('.master-minicard__spec').height());
    var servicesCount = minicardServices.find('li').length;

    while (minicardServices.height() > maxHeight) {
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

};
