'use strict';

module.exports = MasterBlockArticle;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "master-block-article" component.
 * @constructor
 */
function MasterBlockArticle() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
MasterBlockArticle.prototype.render = function () {
    var self = this;
    return this.$context.getStoreData()
        .then(function (data) {
            return {
                masterNumber: data.publication.number,
                masterName: data.name,
                articles: data.articles,
                model: self.$context.attributes['cat-store']
            }
        });
};