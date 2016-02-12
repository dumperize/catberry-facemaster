'use strict';

module.exports = PageRequest;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "page-request" component.
 * @constructor
 */
function PageRequest() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
PageRequest.prototype.render = function () {

};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
PageRequest.prototype.bind = function () {
    var ta = $('textarea');
    autosize(ta);
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
PageRequest.prototype.unbind = function () {
    evt.initEvent('autosize:destroy', true, false);
    ta.dispatchEvent(evt);
};
