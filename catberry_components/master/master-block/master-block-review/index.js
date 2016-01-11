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
    if (this.$context.attributes['master-page']) {
        return this.$context.getStoreData()
            .then(function (data) {
                console.log(data.comments);
                return {
                    comments: data.comments
                }
            });
    }
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
