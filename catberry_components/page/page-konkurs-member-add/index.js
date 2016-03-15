'use strict';

module.exports = PageKonkursMemberAdd;

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

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
PageKonkursMemberAdd.prototype.render = function () {
    return this.$context.getStoreData()
        .then(function(data){
            //console.log(data);
            return data;
        })
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
PageKonkursMemberAdd.prototype.bind = function () {
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
                        console.log(this.name + '_' + new Date().getTime());
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
        $(this).closest('.add-photos__elem-cont').fadeOut(400, function() {
            $(this).next().remove();
            $(this).remove();
            $('.js-add-photo-to-album').fadeIn(400);
        });
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
        $('.standard-error').delay(1000).fadeIn(400).delay(5000).slideUp(500, function() {
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
