'use strict';

module.exports = CompanyItem;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "company/CompanyItem" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function CompanyItem($uhr) {
	this._uhr = $uhr;
	this._config = this.$context.locator.resolve('config');

	this._path = this._config.api + '/company';
	this._options = {
		data: {
			filter: '["and", ["=","number", ":number"]]',
			expand: "master,mastersData,videos,albums,contacts,schedule,workCondition"
		}
	};
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
CompanyItem.prototype._uhr = null;

CompanyItem.prototype._config = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
CompanyItem.prototype.$lifetime = 60000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
CompanyItem.prototype.load = function () {
	var self = this;
	var id = this.$context.state.id;
	if (!id)
		return;

	this._options.data.filter = this._options.data.filter.replace(/:number/g, id);

	return this._uhr.get(this._path, this._options)
		.then(function (result) {
			if (result.status.code >= 400 && result.status.code < 600) {
				throw new Error(result.status.text);
			}
			if (result.content.length == 0 || result.content[0].mastersData.count_masters == 0)
				self.$context.notFound();

			return result.content[0];
		})
};

