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
    return this.$context.getStoreData()
        .then(function (data) {
            try {
                data.vkLikes.data = JSON.parse(data.vkLikes.data);
                if (data.vkLikes.data.length > 9) {
                    data.vkLikes.data.length = 9; //укорачиваем массив до 9 элементов (больше не требуется)
                }
            } catch (e){

            }
            //console.log(data.comments);
            return {
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

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
MasterBlockReview.prototype.unbind = function () {

};
