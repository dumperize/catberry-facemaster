'use strict';

module.exports = MasterBlockReview;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "master-block-review" component.
 * @constructor
 */
function MasterBlockReview() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
MasterBlockReview.prototype.render = function () {
    var self = this;

    return this.$context.getStoreData()
        .then(function (data) {
            //console.log(data);
            if (data.vkLikes) {
                try {
                    data.vkLikes.data = JSON.parse(data.vkLikes.data);
                } catch (e) {
                    data.vkLikes.data = data.vkLikes.data.substring(0, data.vkLikes.data.lastIndexOf('}')) + '}]';
                    data.vkLikes.data = JSON.parse(data.vkLikes.data);
                }
            }
            if (!data.vkLikes || !data.vkLikes.countLikes) {
                data.vkLikes = {
                    data: [],
                    countLikes: 0
                }
            }
            if (data.vkLikes.data.length != 9) {
                data.vkLikes.data.length = 9; //укорачиваем массив до 9 элементов (больше не требуется)
            }
            var location = self.$context.location;
            var url = location.authority.host + location.path;
            url = location.scheme ? location.scheme + url : url;
            console.log(location, location.scheme);
            var desc = '#FM_vizitka ' + data.rubrika.name + ' в Тольятти. ';
            Object.keys(data.services).forEach(function (item) {
                data.services[item].forEach(function (item) {
                    desc += item + '; '
                });
            });

            return {
                id: data.id,
                vkLikes: data.vkLikes,
                name: data.name,
                imgID: data.imgID,
                url: url,
                desc: desc
            }
        });
};
/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
MasterBlockReview.prototype.bind = function () {
    var elem = this.$context.element;
    //domtoimage.toPng(elem.querySelector('.social-links'))
    //    .then(function (img) {
    //        elem.querySelector('.share42init').dataset.image = img;
    //        document.getElementById('test1').src = img;
    //    })
};

MasterBlockReview.prototype.unbind = function () {

};