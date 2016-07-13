'use strict';

module.exports = PageKonkursMemberAdd;
var ComponentForm = require("../../../lib/ComponentForm");
var serializeForm = require("../../../lib/util/SerializeForm");

var util = require('util');
util.inherits(PageKonkursMemberAdd, ComponentForm);
/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "page-konkurs-member-add" component.
 * @constructor
 */
function PageKonkursMemberAdd() {
    ComponentForm.call(this);
    this.formID = '#konkurs-member-add-form';
    this.img = [];
}

PageKonkursMemberAdd.prototype.img = [];

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
PageKonkursMemberAdd.prototype.render = function () {
    var self = this;
    var path = this.$context.location.path.match(/^\/konkurs\/item\/(\d+)\/add-member/i);
    return this._render()
        .then(function (data) {
            if (!data.form) data.form = {};
            data.form.konkursID = path ? path[1] : 0;
            if (data.success) {
                self.img = [];
            } else {
                data.img = self.img;
            }
            //console.log(data);
            return data;
        });
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
PageKonkursMemberAdd.prototype.bind = function () {
    var self = this;
    this.showErrorForImg();

    $('.js-add-photo-to-album').bind('click', openFileInput);
    $('.js-photo-load').bind('change', loadPhotosAndResize);
    $('.js-del-photo-from-album').bind('click', delPhotoFromAlbum);

    function openFileInput() {
        $(this).closest('.add-photos').find('.add-photos__input-photo-load').trigger('click');
        return false;
    }

    function loadPhotosAndResize(e) {
        var files = e.target.files;
        var errFiles = [];
        var completeFiles = 0;
        var filesCount = Object.keys(files).length;
        var toMuchFiles = [];

        for (var i = 0, file; file = files[i]; i++) {
            if (checkMaxAlbumElem()) {
                return false;
            }
            canvasResize(file, {
                width: 800,
                height: 0,
                crop: false,
                quality: 90,
                //rotate: 90,
                callback: function (data, width, height) {
                    if (width >= 220 && height >= 220) {
                        //$.ajax({
                        //    url: $('.mde-photo-edit').attr('action'),
                        //    dataType: 'json',
                        //    type: 'GET', //важно! заменить на POST!
                        //    data: {
                        //        //img: data
                        //    },
                        //    success: function (response) {
                        //        if (response.success) {
                        //            addPhotoToAlbum(data);
                        //            console.log('success!');
                        //        }
                        //    }
                        //});
                        addPhotoToAlbum(data); // для теста
                    } else {
                        errFiles.push(this.name);
                    }
                    completeFiles++;
                    //console.log(completeFiles + ' ' + filesCount);
                    if (completeFiles >= filesCount && errFiles.length > 0) {
                        if (errFiles.length == 1 && 1 == filesCount) {
                            showInfoMessege('Изображение: ' + errFiles + ' слишком маленькое.');
                        } else if (errFiles.length == 1 && 2 <= filesCount) {
                            showInfoMessege('Изображение: ' + errFiles + ' слишком маленькое.<br>Остальные изображения были загружены.');
                        } else {
                            showInfoMessege('Изображения: ' + errFiles + ' слишком маленькие.<br>Остальные изображения были загружены.');
                        }
                    }
                    //if (completeFiles >= filesCount && toMuchFiles.length > 0) {
                    //    showInfoMessege('Изображения: ' + toMuchFiles + ' не были загружены.<br>Закончилось место в альбоме.');
                    //}
                }.bind(file)
            });
        }
        $(this).closest('.mde-photo-edit').trigger('reset');
    }

    function addPhotoToAlbum(data) {
        if (checkMaxAlbumElem()) {
            return false;
        }
        $('.add-photos').find('#elem-cont-template')
            .clone(true)
            .removeAttr('id')
            .appendTo('.add-photos__wrapper')
            .removeAttr('style')
            .find('.add-photos__img')
            .attr('src', data)
            .closest('.add-photos__wrapper').append('<div class="add-photos__clear-div"></div>');
        if (checkMaxAlbumElem()) {
            showInfoMessege('Достигнуто максимальное количество фотографий в альбоме!');
            $('.mde-photo-edit__add-btn').hide();
        }
        return true;
    }

    function delPhotoFromAlbum() {
        $(this).closest('.add-photos__elem-cont').fadeOut(400, function () {
            $(this).next().remove();
            $(this).remove();
            $('.js-add-photo-to-album').fadeIn(400);
        });
        var img = $(this).parent().find('img');

        if (!img.hasClass('add-photos__img')) {
            var src = img.attr('src');
            var key = src.substring(src.indexOf('/files?key=') + 11);
            self.img.splice(self.img.indexOf(key), 1);
        }
        return false;
    }

    function checkMaxAlbumElem() {
        var photosCont = $('.add-photos');
        var maxElem = photosCont.data('maxElem');
        var maxElemExisting = photosCont.children('.add-photos__wrapper').find('.add-photos__elem-cont').length;

        if (maxElem == maxElemExisting) {
            $('.js-add-photo-to-album').fadeOut(400);
            return true;
        } else {
            return false;
        }
    }

    function showInfoMessege(message) {
        $('.add-photos').prepend('<p class="standard-error" style="display: none">' + message + '</p>');
        $('.standard-error').delay(1000).fadeIn(400).delay(5000).slideUp(500, function () {
            $(this).remove();
        });
    }

    function writeAlbumEdit(responce) {
        var albumCont = $('.mde-photo-edit__wrapper');

        albumCont.html('');
        for (var i = 0; i < responce.data.photos.length; i++) {
            var src = responce.data.photos[i].preview;
            addPhotoToAlbum(src);
        }
    }

    return this._bind();
};

PageKonkursMemberAdd.prototype.showErrorForImg = function () {
    if (this.error) {
        this.error.forEach(function (item) {
            if (item.field == 'photos') {
                $('.add-photos').prepend('<p class="standard-error">' + item.message + '</p>');
            }
        });
    }
    //$(input).parent().addClass('input-error').append('<p class="standard-error">' + item.message + '</p>');
};
/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
PageKonkursMemberAdd.prototype.unbind = function () {
    $('.js-add-photo-to-album').unbind('click');
    $('.js-photo-load').unbind('change');
    $('.js-del-photo-from-album').unbind('click');
};


PageKonkursMemberAdd.prototype.handleSubmit = function (event) {
    event.preventDefault();
    event.stopPropagation();

    this.data = serializeForm($(this.formDOM).serializeArray());

    var self = this;
    var imgSrc = this._getSrcNewPhoto();

    var promises = imgSrc.map(function (el) {
        return self.fileSave(el)
    });

    return Promise.all(promises)
        .then(function (res) {
            self._setHiddenField();
            self.$context.sendAction('send', self.data);
        })
};

PageKonkursMemberAdd.prototype.fileSave = function (base64) {
    var self = this;
    return this.$context.sendAction('fileUpload', {fileData: base64})
        .then(function (data) {
            if (data && data.key)
                self.img.push(data.key);
            return data.key;
            //заставить при всех отправках форм больше не сохранять файл, пока не будет нажата кнопка "крестик" и загружена новая картинка
        });
};

PageKonkursMemberAdd.prototype._getSrcNewPhoto = function () {
    var img = this.$context.element.querySelectorAll('.add-photos__img');
    var imgSrc = [];
    Object.keys(img)
        .forEach(function (key) {
            var el = img[key];
            if (el && el.getAttribute('src'))
                imgSrc.push(el.getAttribute('src'));
        });
    return imgSrc;
};

PageKonkursMemberAdd.prototype._setHiddenField = function () {
    var self = this;
    this.img.forEach(function (el, i) {
        self.data['photos[' + i + ']'] = el;
    });
};