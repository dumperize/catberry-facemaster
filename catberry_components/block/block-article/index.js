'use strict';

module.exports = Article;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "article" component.
 * @constructor
 */
function Article() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
Article.prototype.render = function () {
    var model = this.$context.attributes['cat-store'];
    var id = this.$context.attributes['id-block'];

    if (model == 'master/MasterItem') {
        return this.$context.getStoreData()
            .then(function (data) {
                return data.articles[id];
            });
    }
    return this.$context.getStoreData()
        .then(function (data) {
            return data[id];
        });
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
Article.prototype.bind = function () {

};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
Article.prototype.unbind = function () {

};