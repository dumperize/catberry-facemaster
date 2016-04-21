'use strict';

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * http://catberry.org/documentation#cat-components-interface
 */

class SearchFacets {

    /**
     * Creates a new instance of the "search-facets" component.
     */
    constructor() {

    }

    /**
     * Gets a data context for the template engine.
     * This method is optional.
     * @returns {Promise<Object>|Object|null|undefined} The data context for the template engine.
     */
    render() {
        var self = this;
        return this.$context.getStoreData()
            .then(function (data) {
                return {
                    list: data,
                    url: '/search',
                    query: self.$context.location.query.values.query
                }
            })
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

module.exports = SearchFacets;

