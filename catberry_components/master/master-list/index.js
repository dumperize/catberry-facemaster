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
        this._handlerScroll = this._handlerScroll.bind(this);
    }
}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
MasterList.prototype.render = function () {
    return this.$context.getStoreData();
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
MasterList.prototype.bind = function () {
    this._window.addEventListener('resize', this._allMinicardServicesCut);
    this._window.addEventListener('scroll', this._handlerScroll);
};

MasterList.prototype.unbind = function () {
    this._window.removeEventListener('resize', this._allMinicardServicesCut);
    this._window.removeEventListener('scroll', this._handlerScroll);
    this.$context.collectGarbage();
};

/**
 * Handles window scroll for infinite scroll loading.
 * @private
 */
MasterList.prototype._handlerScroll = function () {
    var windowHeight = this._window.innerHeight,
        scrollTop = this._window.pageYOffset,
        doc = this._window.document.documentElement;
    try {
        // when scroll to the bottom of the page load more items
        if (scrollTop >= (doc.scrollHeight - windowHeight * 1.5) ||
            doc.scrollHeight <= windowHeight) {
            //console.log('loadMoreItems');
            this._loadMoreItems();
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
    this.$context.sendAction('getNextPage');
};

MasterList.prototype._allMinicardServicesCut = function () {
    $('.master-minicard').each(function () {
        var minicardServices = $(this).find('.master-minicard__services');
        var servicesList = minicardServices.find('li');
        var maxHeight =
            $(this).height() - ($(this).find('.master-minicard__name').height() + $(this).find('.master-minicard__spec').height());
        var servicesCount = minicardServices.find('li').length;

        if (minicardServices.height() > maxHeight) {
            while (minicardServices.height() > maxHeight && servicesCount >= 0) {
                $(servicesList[servicesCount - 1]).hide();
                servicesCount--;
            }
        } else if ((minicardServices.height() + 10) < maxHeight) {
            var i = 0;
            while (minicardServices.height() < maxHeight && i < servicesCount + 1) {
                $(servicesList[i]).show();
                i++;
            }
            if (minicardServices.height() > maxHeight) {
                $(servicesList[i - 1]).hide();
            }
        }
    });
};

