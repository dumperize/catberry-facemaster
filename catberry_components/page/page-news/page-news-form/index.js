'use strict';

module.exports = PageNewsForm;
var serializeForm = require("../../../../lib/util/SerializeForm");
var ComponentCropIt = require("../../../../lib/ComponentCropIt");

var util = require('util');
util.inherits(PageNewsForm, ComponentCropIt);


/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "page-news-form" component.
 * @constructor
 */
function PageNewsForm() {
    ComponentCropIt.call(this);

    this.formID = '#news-add-form';
}

PageNewsForm.prototype.imgsrc = null;

PageNewsForm.prototype.render = function () {
    var self = this;
    return this._render()
        .then(function (data) {
            if (data.success)
                self.imgsrc = '';
            else {
                data.imgsrc = self.imgsrc;
            }
            return data;
        });
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
PageNewsForm.prototype.bind = function () {
    var submitNews = $('.submit-news');
    submitNews.bind('click', showAddNews);
    $('.js-hide-submit-news').bind('click', hideAddNews);

    function showAddNews() {
        submitNews.addClass('show');
        $('.submit-news form').toggle(500);
        submitNews.unbind('click', showAddNews);
    }

    function hideAddNews() {
        $('.submit-news form').toggle(500, function () {
            $('.submit-news').removeClass('show');
            submitNews.bind('click', showAddNews);
        });
        return false;
    }

    var event = this._bind();
    event.click = {
        '.js-photo-upload': this._photoInitCropIt,
        '.js-photo-remove': this._photoRemove
    };
    return event;
};

PageNewsForm.prototype.handleSubmit = function (event) {
    event.preventDefault();
    event.stopPropagation();
    var self = this;
    var img = this.$context.element.querySelector('.add-news-thumb-result img');

    this.data = serializeForm($(this.formDOM).serializeArray());
    this.imgsrc = img ? img.getAttribute('src') : null;

    if (this.data.uploadImg)
        return self.$context.sendAction('send', self.data);

    return this.fileSave(this.imgsrc)
        .then(function (res) {
            self.$context.sendAction('send', self.data);
        })
};

PageNewsForm.prototype._photoInitCropIt = function (event) {
    var selfId = this.$context.attributes.id;
    var data = {id: 'img-upload', callCompId: selfId, width: 220, height: 220, exportzoom: 1};
    var f = function(data) {
        document.querySelector('.news-list').insertBefore(data, document.querySelector('.news'));
    };
    this._photoCropIt(event, data, f)
};

PageNewsForm.prototype._photoRemove = function () {
    this.$context.element.querySelector('.add-news-thumb-result img').remove();
};

PageNewsForm.prototype._imgResizeResult = function (img) {
    $(this.$context.element.querySelector('.add-news-thumb-result')).prepend('<img src="' + img + '" alt="">');
    $(self.$context.element.querySelector('.submit-news')).addClass('show');
    $(self.$context.element.querySelector('.submit-news form')).show();
};

PageNewsForm.prototype.fileSave = function (base64) {
    var self = this;
    return this.$context.sendAction('fileUpload', {fileData: base64})
        .then(function (data) {
            self.data.uploadImg = data ? data.key : null;

            //заставить при всех отправках форм больше не сохранять файл, пока не будет нажата кнопка "крестик" и загружена новая картинка
        });
};