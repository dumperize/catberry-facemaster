'use strict';

module.exports = Video;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "video" component.
 * @constructor
 */
function Video() {
    this._videoPopUpData = {};
}
Video.prototype._videoPopUpData = null;

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
Video.prototype.render = function () {
    var model = this.$context.attributes['cat-store'];
    var id = this.$context.attributes['id-block'];
    var index = this.$context.attributes['index'];
    var self = this;

    return this.$context.getStoreData()
        .then(function (data) {
            var video;
            if (model == 'master/MasterItem') {
                video = data.videos[index];
            } else {
                video = data.list[index];
            }
            self._videoPopUpData = video;
            self._videoPopUpData.id = 'popup-video-' + video.id;
            //console.log(video);
            return video;
        });

};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
Video.prototype.bind = function () {
    var self = this;
    var contId = '#block-video-' + this._videoPopUpData.id + ' .video-cont';
    console.log(this._videoPopUpData);
    console.log('#block-video-' + this._videoPopUpData.id);
    //$('#block-video-' + this._videoPopUpData.id).find('.video-cont').bind('click', showVideoPopup);

    function showVideoPopup() {
        console.log('123');
        self.$context.createComponent('block-video-popup', self._videoPopUpData)
            .then(function (data) {
                console.log(data);
            });
        return false;
    }

    return {
        click: {
            '.video-cont': function (event) {
                event.preventDefault();
                event.stopPropagation();
                self.$context.createComponent('block-video-popup', self._videoPopUpData)
                    .then(function (data) {
                        console.log(data);
                        console.log(data.innerHTML);
                        $.fancybox.open(data.innerHTML, {
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
                    });
                self.$context.collectGarbage();
                return false;
            }
        }
    }
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
Video.prototype.unbind = function () {
    //$('.video-cont').unbind('click');
};


