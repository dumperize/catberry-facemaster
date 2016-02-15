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
                video.number = data.page.number;
                video.name = data.name;
                video.imgid = data.imgID;
            } else {
                video = data.list[index];
                video.number = video.owner.page.number;
                video.name = video.owner.name;
                video.imgid = video.owner.imgID;
                console.log(video);
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
    //console.log(this._videoPopUpData);

    return {
        click: {
            '.video-cont__video-cover': function (event) {
                event.preventDefault();
                event.stopPropagation();
                self.$context.createComponent('block-video-popup', self._videoPopUpData)
                    .then(function (data) {
                        //console.log(data);
                        //console.log(data.innerHTML);
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
                            },
                            afterClose: function () {
                                self.$context.collectGarbage();
                            }
                        });
                    });
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

};


