'use strict';

module.exports = CompanyList;

var util = require('util'),
	MasterList = require('../master/MasterList');
/**
 * наследуемся от пагинатора для постраничной навигации
 */
util.inherits(CompanyList, MasterList);
/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "master/masterList" store.
 * @param {UHR} $uhr Universal HTTP request.this
 * @constructor
 */
function CompanyList($uhr) {
	MasterList.call(this);
	this._pathBase = '/company';
	this._path = this._pathBase + '/byrubrika';
	this._options = {
		data: {
			expand: 'mastersData'
		}
	};
}

CompanyList.prototype.load = function () {
	var self = this;

	return this.$context.getStoreData('Tag')
		.then(function (tag) {
			if (!tag.rubrika)
				return;
			self._clearFeed(tag);

			self._path = self._pathBase + '/byrubrika/' + tag.rubrika.id;
			if (tag.tag.id) {
				self._path = self._pathBase + '/bytag/' + tag.tag.id;
			}

			return self._loadDataPerPage(self._currentPage);
		})
		.then(function (result) {
			if (!result || result.length === 0) {
				self._isFinished = true;
				return self._currentFeed;
			}

			result.forEach(function (el) {
				self._currentFeed[el.id] = el;
			});
			//self._currentFeed = self._currentFeed.concat(result);
			return self._currentFeed;
		});
};