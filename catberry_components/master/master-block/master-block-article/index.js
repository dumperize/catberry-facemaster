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
    if (this.$context.attributes['master-page']) {
        return this.$context.getStoreData()
            .then(function (data) {
                data.articles.forEach(function (item) {
                    item.author = data.name; //добавляем автора для каждой статьи
                });
                //console.log(data.articles);
                return {
                    articles: data.articles
                }
            });
    }
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
