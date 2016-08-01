'use strict';

module.exports = Master;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "master/Master" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function Master() {
	this._uhr = this.$context.locator.resolve('uhr');
	this._config = this.$context.locator.resolve('config');
	this._api = this._api || this._config.api;
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
Master.prototype._uhr = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
Master.prototype.$lifetime = 60000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
Master.prototype.load = function () {

};

/**
 * Handles action named "some-action" from any component.
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
Master.prototype.handleSetMasterID = function (masterID) {
	if (!masterID) return false;
	return this._uhr.get(this._api + '/master/' + masterID)
		.then(function (result) {
			if (result.status.code != 200) return false;
			return result.content;
		});
};
