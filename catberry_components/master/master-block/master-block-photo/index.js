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
            //console.log(data.albums);
            return {
                albums: [
                    {
                        "id": 1991,
                        "ownerType": 1,
                        "ownerID": 1019,
                        "name": "Альбом №1",
                        "status": 1,
                        "photos": [
                            {
                                "id": 63853,
                                "albumID": 1991,
                                "imgID": "5693458623041",
                                "description": null
                            },
                            {
                                "id": 63854,
                                "albumID": 1991,
                                "imgID": "569345868bbb3",
                                "description": null
                            },
                            {
                                "id": 63855,
                                "albumID": 1991,
                                "imgID": "5693458701367",
                                "description": null
                            },
                            {
                                "id": 63856,
                                "albumID": 1991,
                                "imgID": "5693458771840",
                                "description": null
                            },
                            {
                                "id": 63857,
                                "albumID": 1991,
                                "imgID": "56934587d8e05",
                                "description": null
                            },
                            {
                                "id": 63858,
                                "albumID": 1991,
                                "imgID": "5693458845eb4",
                                "description": null
                            },
                            {
                                "id": 63859,
                                "albumID": 1991,
                                "imgID": "56934588af766",
                                "description": null
                            }
                        ]
                    },
                    {
                        "id": 1993,
                        "ownerType": 1,
                        "ownerID": 1058,
                        "name": "Сертификаты",
                        "status": 1,
                        "photos": [
                            {
                                "id": 64068,
                                "albumID": 1993,
                                "imgID": "569345ba20dc9",
                                "description": null
                            },
                            {
                                "id": 64069,
                                "albumID": 1993,
                                "imgID": "569345ba80f84",
                                "description": null
                            },
                            {
                                "id": 64070,
                                "albumID": 1993,
                                "imgID": "569345baeb4d9",
                                "description": ""
                            },
                            {
                                "id": 64071,
                                "albumID": 1993,
                                "imgID": "569345bb5f92a",
                                "description": null
                            },
                            {
                                "id": 64072,
                                "albumID": 1993,
                                "imgID": "569345bc6aee8",
                                "description": null
                            },
                            {
                                "id": 88332,
                                "albumID": 1993,
                                "imgID": "5693503e61284",
                                "description": null
                            },
                            {
                                "id": 88333,
                                "albumID": 1993,
                                "imgID": "5693503ec5377",
                                "description": null
                            },
                            {
                                "id": 119761,
                                "albumID": 1993,
                                "imgID": "56936e0849ae9",
                                "description": null
                            }
                        ]
                    }
                ]
            }
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
