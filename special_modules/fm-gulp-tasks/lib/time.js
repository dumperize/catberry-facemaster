'use strict';

module.exports = {

	/**
	 * Gets current date and time
	 * @returns {string}
	 */
	captureNow: function () {
		return (new Date()).toGMTString();
	}
};