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
            } else if (model == 'master/MasterList' || model == 'search/Search') {
                var masterIndex = self.$context.attributes['master-index'];
                video = data.list[masterIndex].activeVideos[0];
                video.number = data.list[masterIndex].page.number;
                video.name = data.list[masterIndex].name;
                video.imgid = data.list[masterIndex].imgID;
            } else if (model == 'company/CompanyItem') {
                var masterIndex = self.$context.attributes['master-index'];
                video = data.masters[masterIndex].activeVideos[0];
                video.number = data.masters[masterIndex].page.number;
                video.name = data.masters[masterIndex].name;
                video.imgid = data.masters[masterIndex].imgID;
            } else if (model == 'video/VideoByRubrika') {
                video = data.data[index];
                video.number = video.owner.page.number;
                video.name = video.owner.name;
                video.imgid = video.owner.imgID;
            } else {
                video = data.list[index];
                video.number = video.owner.page.number;
                video.name = video.owner.name;
                video.imgid = video.owner.imgID;
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
    return this.render()
        .then(function () {
            return {
                click: {
                    '.video-cont__video-cover': self.handlePopUp
                }
            }
        });
};

Video.prototype.handlePopUp = function (event) {
    var self = this;
    event.preventDefault();
    event.stopPropagation();

    self.$context.createComponent('block-video-popup', self._videoPopUpData)
        .then(function (data) {
            $.fancybox.open(data.innerHTML, {
                margin: 40,
                padding: 20,
                type: 'inline',
                width: '80%',
                maxWidth: '800px',
                minWidth: '250px',
                autoHeight: true,
                autoSize: false,
                afterClose: function () {
                    self.$context.collectGarbage();
                }
            });
        });
    return false;
};
/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
Video.prototype.unbind = function () {

};


