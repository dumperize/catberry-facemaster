'use strict';

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * http://catberry.org/documentation#cat-components-interface
 */

class CountBtn {

	/**
	 * Creates a new instance of the "count-btn" component.
	 */
	constructor() {

	}

	/**
	 * Gets a data context for the template engine.
	 * This method is optional.
	 * @returns {Promise<Object>|Object|null|undefined} The data context for the template engine.
	 */
	render() {
		return this.$context.getStoreData();
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

module.exports = CountBtn;

