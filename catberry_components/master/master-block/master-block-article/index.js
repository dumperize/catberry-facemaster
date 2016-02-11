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
            //console.log(data);
            data.articles.forEach(function (item) {
                console.log(item.owner);
                item.owner = {
                    page: {
                        number: data.page.number
                    }
                };
            });
            return {
                articles: data.articles,
                model: self.$context.attributes['cat-store']
            }
        });
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
MasterBlockArticle.prototype.bind = function () {

};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
MasterBlockArticle.prototype.unbind = function () {

};
