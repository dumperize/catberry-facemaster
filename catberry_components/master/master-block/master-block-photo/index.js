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
            console.log(data.albums);
            data.albums.forEach (function (item) {
                if (item.photos.length > 10) {
                    item.photos.length = 10; //укорачиваем массив до 10 элементов (больше запрещено)
                }
            });
            return data.albums;
        });
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
MasterBlockPhoto.prototype.bind = function () {
    var album = $('.photo-md__album-cover');
    var albumCont = $('.photo-md__album-cont');
    var albumPhotos = $('.photo-md__img-prev');
    album.bind('click', showAlbum);
    albumPhotos.bind('click', showAlbumImg);
    album.first().addClass('act');

    function showAlbum() {
        albumCont.hide();
        album.removeClass('act');
        $(this).addClass('act');
        $('#cont-' + ($(this).attr('id'))).show();
        return false;
    }

    function showAlbumImg() {
        $.fancybox(albumPhotos, {
            type: 'image',
            index: albumPhotos.index(this),
            helpers: {
                overlay: {
                    locked: false
                }
            }
        });
        return false;
    }
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
