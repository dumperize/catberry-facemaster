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
    return {
        click: {
            '.js-photo-upload': this._photoUpload
        }
    }
};

PageNews.prototype._photoUpload = function (event) {
    event.preventDefault();
    event.stopPropagation();

    var el = event.target;
    var href = this.$context.element.querySelector('.js-photo-upload').href;
    var unique = href.slice(href.indexOf('#'));
    var self = this;

    console.log(unique);
    this.$context.createComponent('img-upload', {id: unique})
        .then(function (data) {
            console.log(data);
            self.$context.element.querySelector('.news-list').insertBefore(data, self.$context.element.querySelector('.news'));
            $(self.$context.element.querySelector('.js-open-file')).trigger('click');
            return data;
        });
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
PageNews.prototype.unbind = function () {

};
