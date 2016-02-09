'use strict';

module.exports = PageNews;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "page-news" component.
 * @constructor
 */
function PageNews() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
PageNews.prototype.render = function () {
    return this.$context.getStoreData();
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
PageNews.prototype.bind = function () {
    var submitNews = $('.submit-news');
    submitNews.bind('click', showAddNews);
    $('.js-hide-submit-news').bind('click', hideAddNews);

    function showAddNews () {
        submitNews.addClass('show');
        $('.submit-news form').toggle(500);
        submitNews.unbind('click', showAddNews);
    }
    function hideAddNews () {
        $('.submit-news form').toggle(500, function() {
            $('.submit-news').removeClass('show');
            submitNews.bind('click', showAddNews);
        });
        return false;
    }
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
PageNews.prototype.unbind = function () {

};
