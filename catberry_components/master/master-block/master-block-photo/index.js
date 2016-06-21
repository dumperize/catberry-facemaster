'use strict';

module.exports = MasterBlockPhoto;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "master-block-photo" component.
 * @constructor
 */
function MasterBlockPhoto() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
MasterBlockPhoto.prototype.render = function () {
    return this.$context.getStoreData()
        .then(function (data) {
            //console.log(data);
            data.albums.forEach (function (item) {
                if (item.photos.length > 9) {
                    item.photos.length = 9; //укорачиваем массив до 10 элементов (больше запрещено)
                }
            });
            //console.log(data.albums);
            return data.albums;
        });
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
MasterBlockPhoto.prototype.bind = function () {
    $('.photo-md__album-cover').first().addClass('act');

    return {
        click: {
            '.js-select-album': this._handleShowAlbum,
            '.photo-md__img-prev': this._handleShowAlbumImg
        }
    }
};

MasterBlockPhoto.prototype._handleShowAlbum = function (event) {
    event.preventDefault();
    event.stopPropagation();

    var obj = event.target;
    if (!$(obj).hasClass('photo-md__album-cover')) {
        obj = $(obj).closest('.photo-md__album-cover');
    }
    var album = this.$context.element.querySelectorAll('.photo-md__album-cover');
    var albumCont = this.$context.element.querySelectorAll('.photo-md__album-cont');

    $(albumCont).hide();
    $(album).removeClass('act');
    $(obj).addClass('act');
    $('#cont-' + ($(obj).attr('id'))).show();
};

MasterBlockPhoto.prototype._handleShowAlbumImg = function (event) {
    event.preventDefault();
    event.stopPropagation();

    var obj = event.target;
    if (!$(obj).hasClass('photo-md__img-prev')) {
        obj = $(obj).closest('.photo-md__img-prev');
    }
    var albumPhotos = this.$context.element.querySelectorAll('.photo-md__img-prev');

    $.fancybox($(albumPhotos), {
        type: 'image',
        index: $(albumPhotos).index(obj),
        padding: 10,
        prevEffect: 'none',
        nextEffect: 'none',
        helpers: {
            title: {
                type: 'inside'
            },
            thumbs: {
                width: 80,
                height: 80
            }
        }
    });
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
MasterBlockPhoto.prototype.unbind = function () {
    var album = $('.photo-md__album-cover');
    var albumPhotos = $('.photo-md__img-prev');

    album.unbind('click');
    albumPhotos.unbind('click');
};
