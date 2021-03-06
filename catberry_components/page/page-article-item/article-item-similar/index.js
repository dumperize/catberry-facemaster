'use strict';

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * http://catberry.org/documentation#cat-components-interface
 */

class ArticleItemSimilar {

    /**
     * Creates a new instance of the "article-item-similar" component.
     */
    constructor() {
        this.var = 1;
    }

    /**
     * Gets a data context for the template engine.
     * This method is optional.
     * @returns {Promise<Object>|Object|null|undefined} The data context for the template engine.
     */
    render() {
        return this.$context.getStoreData()
            .then(data => {
                return {
                    list: data,
                    empty: (data.length > 0)
                };
            });
    }

    /**
     * Returns event binding settings for the component.
     * This method is optional.
     * @returns {Promise<Object>|Object|null|undefined} The binding settings or nothing.
     */
    bind() {

    }

    /**
     * Clans everything up. The events have been set by .bind() method are cleaned automatically.
     * This method is optional.
     * @returns {Promise|undefined} Promise or finished work or nothing.
     */
    unbind() {

    }
}

module.exports = ArticleItemSimilar;

