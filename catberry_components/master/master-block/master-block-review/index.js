'use strict';

module.exports = MasterBlockReview;
var Typograf = require('typograf');

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
    this.tp = new Typograf({lang: 'ru'});
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
            data.comments.forEach(function (item, i) {
                data.comments[i].text = self.tp.execute(item.text);
            });
            //console.log(data.vkLikes);
            return {
                id: data.id,
                comments: data.comments.reverse(),
                vkLikes: data.vkLikes,
                name: data.name,
                imgID: data.imgID
            }
        });
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
MasterBlockReview.prototype.bind = function () {
};
