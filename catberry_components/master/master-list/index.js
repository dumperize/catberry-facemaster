'use strict';

module.exports = MasterList;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "master-list" component.
 * @constructor
 */
function MasterList($serviceLocator) {
// we can use window from the locator in a browser only
    if (this.$context.isBrowser) {
        this._window = $serviceLocator.resolve('window');
        this._handleScroll = this._handleScroll.bind(this);
    }
}

MasterList.prototype._isBusy = false;
MasterList.prototype._isFinish = false;

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
MasterList.prototype.render = function () {
    var self = this;
    return this.$context.getStoreData()
        .then(function (data) {
            data.model = self.$context.attributes['cat-store'];
            data.isHaveMaster = (Object.keys(data.list).length);
            self.structurData(data);
            self._isFinish = data.isFinished;
            return data;
        });
};

/**
 * Перестройка пришедших данных
 * @param data
 */
MasterList.prototype.structurData = function (data) {
    data.list.forEach(function (master) {
        //из-за ильи так произошло!
        master.comments = master.activeComments;
        master.sales = master.activeSales;
        master.videos = master.activeVideos;
        master.albums = master.activeAlbums;
        //конец из-за ильи так произошло!

        try {
            master.services = JSON.parse(master.services);
        } catch (e) {

        }
        if (master.vkLikes) {
            master.vkLikes.countLikes = master.vkLikes.countLikes ? master.vkLikes.countLikes : 0;
        } else {
            master.vkLikes = {};
            master.vkLikes.countLikes = 0;
        }
    });
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
MasterList.prototype.bind = function () {
    this._window.addEventListener('scroll', this._handleScroll);
};

MasterList.prototype.unbind = function () {
    this._window.removeEventListener('scroll', this._handleScroll);
    this.$context.collectGarbage();
};

/**
 * Handles window scroll for infinite scroll loading.
 * @private
 */
MasterList.prototype._handleScroll = function () {
    var self = this;
    var windowHeight = this._window.innerHeight,
        scrollTop = this._window.pageYOffset,
        doc = this._window.document.documentElement;

    try {
        // when scroll to the bottom of the page load more items
        if (
            !this._isFinish && !this._isBusy &&
            (scrollTop >= (doc.scrollHeight - windowHeight * 2) ||
            doc.scrollHeight <= windowHeight)
        ) {
            this._isBusy = true;
            $('#wait-spinner').show();
            this._loadMoreItems()
                .then(function (finish) {
                    if (finish === null) {
                        self._isFinish = true;
                    }
                    self._isBusy = false;
                    $('#wait-spinner').fadeOut(800);
                });
        }
    } catch (e) {
        // do nothing
    }
};

/**
 * Loads more items to feed.
 * @private
 */
MasterList.prototype._loadMoreItems = function () {
    return this.$context.sendAction('getNextPage');
};
