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
    var attr = this.$context.attributes;

    if (attr['cat-store'] == 'master/MasterItem') {
        return this.$context.getStoreData()
            .then(function (data) {
                return {
                    article: data.articles[attr.index],
                    masterNumber: attr['master-number'],
                    masterName: attr['master-name']
                };
            });
    }
    return this.$context.getStoreData()
        .then(function (data) {
            return {
                article: data.list[attr.index],
                masterNumber: attr['master-number'],
                masterName: attr['master-name']
            }
        });
};
