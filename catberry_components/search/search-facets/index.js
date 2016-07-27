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
                var tmpArr = [{rubrikaName: 'Поиск по сайту', count: 0}];
                //console.log(data);
                data.forEach(function (item, i) {
                    tmpArr[i + 1] = item;
                    tmpArr[0].count += item.count;
                });
                return {
                    list: tmpArr,
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
        return {
            'click': {
                '.search-menu li:first-child a': this._searchChanged
            }
        }
    }

    _searchChanged(e) {
        console.log('_searchChanged');
        this.$context.sendAction('searchChanged');
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

