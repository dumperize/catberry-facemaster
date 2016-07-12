'use strict';

module.exports = PageNewsForm;
var ComponentForm = require("../../../../lib/ComponentForm");
var serializeForm = require("../../../../lib/util/SerializeForm");


var util = require('util');
util.inherits(PageNewsForm, ComponentForm);

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
    ComponentForm.call(this);

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

    return this._bind();
};

PageNewsForm.prototype.handleSubmit = function (event) {
    event.preventDefault();
    event.stopPropagation();
    var self = this;
    var img = this.$context.element.querySelector('.js-cropit-photo-result img');

    this.data = serializeForm($(this.formDOM).serializeArray());
    this.imgsrc = img ? img.getAttribute('src') : null;

    if (this.data.uploadImg)
        return self.$context.sendAction('send', self.data);

    return this.fileSave(this.imgsrc)
        .then(function (res) {
            self.$context.sendAction('send', self.data);
        })
};

PageNewsForm.prototype.fileSave = function (base64) {
    var self = this;
    return this.$context.sendAction('fileUpload', {fileData: base64})
        .then(function (data) {
            self.data.uploadImg = data ? data.key : null;

            //заставить при всех отправках форм больше не сохранять файл, пока не будет нажата кнопка "крестик" и загружена новая картинка
        });
};

PageNewsForm.prototype.unbind = function () {
    $('.submit-news').unbind('click');
    $('.js-hide-submit-news').unbind('click');
};