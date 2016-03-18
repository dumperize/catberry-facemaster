'use strict';

module.exports = PageNews;
var ComponentCropIt = require("../../../lib/ComponentCropIt");

var util = require('util');
util.inherits(PageNews, ComponentCropIt);

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
    ComponentCropIt.call(this);
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
            '.js-photo-upload': this._photoInitCropIt,
            '.js-photo-remove': this._photoRemove
        }
    }
};

PageNews.prototype._photoInitCropIt = function (event) {
    var selfId = this.$context.attributes.id;
    var data = {id: 'img-upload', callCompId: selfId, width: 220, height: 220, exportzoom: 1};
    var f = function(data) {
        this.$context.element.querySelector('.news-list').insertBefore(data, this.$context.element.querySelector('.news'));
    };
    this._photoCropIt(event, data, f)
};

PageNews.prototype._photoRemove = function () {
    this.$context.element.querySelector('.add-news-thumb-result img').remove();
};
PageNews.prototype._imgResizeResult = function (img) {
    $(this.$context.element.querySelector('.add-news-thumb-result')).prepend('<img src="' + img + '" alt="">');
    $(this.$context.element.querySelector('.submit-news')).addClass('show');
    $(this.$context.element.querySelector('.submit-news form')).show();
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
PageNews.prototype.unbind = function () {

};
