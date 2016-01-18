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
    var video = $('.video-md__video-cover');
    video.bind('click', showVideo);

    function showVideo() {
        $.fancybox.open(this, {
            padding: 0,
            type: 'iframe',
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
