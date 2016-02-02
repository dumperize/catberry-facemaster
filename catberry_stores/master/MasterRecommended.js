'use strict';

module.exports = MasterRecommended;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "master/MasterRecommended" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function MasterRecommended($uhr) {
    this._uhr = $uhr;
    this.$context.setDependency('rubrika/Rubrika');
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
MasterRecommended.prototype._uhr = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
MasterRecommended.prototype.$lifetime = 60000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
MasterRecommended.prototype.load = function () {
    return this.$context.getStoreData('rubrika/Rubrika')
        .then(function (data) {
            return data.recomendMasters;
        });
};
