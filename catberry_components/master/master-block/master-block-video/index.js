'use strict';

module.exports = MasterBlockVideo;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "master-block-video" component.
 * @constructor
 */
function MasterBlockVideo() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
MasterBlockVideo.prototype.render = function () {
    if (this.$context.attributes['master-page']) {
        return this.$context.getStoreData()
            .then(function (data) {
                //console.log(data.videos);
                return {
                    videos: data.videos
                }
            });
    }
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
MasterBlockVideo.prototype.bind = function () {
    $('.video-cont__video-cover').bind('click', showVideoPopup);

    function showVideoPopup() {
        //console.log('click!');
        var tmp = $('.popup-video-cont').clone(),
            url = $(this).attr('href'),
            title = $(this).find('.video-cont__title-prev').html(),
            desc = $(this).find('.video-cont__desc').html(),
            name = $('.master-card-mp__name').html(),
            imgSrc = $('.master-page__img').attr('src');
        tmp.find('.popup-video-cont__video-cont').html('<iframe src="' + url + '" frameborder="0" allowfullscreen></iframe>');
        tmp.find('.popup-video-cont__title').html(title);
        tmp.find('.popup-video-cont__text').html(desc);
        tmp.find('.master-micro-inf__name').html('<br>' + name);
        tmp.find('.master-micro-inf img').attr('src', imgSrc);
        $.fancybox.open(tmp, {
            padding: 20,
            type: 'inline',
            width: '80%',
            maxWidth: '800px',
            minWidth: '250px',
            autoHeight: true,
            autoSize: false,
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
MasterBlockVideo.prototype.unbind = function () {
    $('.video-md__video-cover').unbind('click');
};
