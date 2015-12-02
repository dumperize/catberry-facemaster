'use strict';

module.exports = Rubrika;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "rubrika/Rubrika" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function Rubrika($uhr) {
    this._uhr = $uhr;
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
Rubrika.prototype._uhr = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
Rubrika.prototype.$lifetime = 600000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
Rubrika.prototype.load = function () {
    console.log(this.$context);
    var podrubrika = this.$context.state.podrubrika;
    if (!podrubrika) {
        return;
    }
    return this._uhr.get(
            'http://localhost:3000/data-json/rubrika-' + podrubrika + '.json'
        )
        .then(function (result) {
            if (result.status.code >= 400 && result.status.code < 600) {
                throw new Error(result.status.text);
            }

            var seoArr = [];
            Object.keys(result.content.seo)
                .forEach(function (d) {
                    seoArr[result.content.seo[d].section] = result.content.seo[d];
                });
            if (true)///вставить правило!
                result.content.currentSeo = seoArr['master'];
            //else
            //    data['currentSeo'] = seoArr[self.$context.state.section];
            result.content.podrubrika = podrubrika;

            return result.content;
        });
};

/**
 * Handles action named "some-action" from any component.
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */

Rubrika.prototype.handleGetCurrentPodrubrika = function(){
    return this.$context.state.podrubrika;
}