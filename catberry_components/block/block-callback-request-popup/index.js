'use strict';

module.exports = BlockCallbackRequestPopup;
var serializeForm = require("../../../lib/util/SerializeForm");
var ComponentForm = require("../../../lib/ComponentForm");

var util = require('util');
util.inherits(BlockCallbackRequestPopup, ComponentForm);

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "block-callback-request-popup" component.
 * @constructor
 */
function BlockCallbackRequestPopup() {
    ComponentForm.call(this);
    this.formID = '#callback-request-popup-form';
}

BlockCallbackRequestPopup.prototype.masterID = null;

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
BlockCallbackRequestPopup.prototype.render = function () {
    this.masterID = this.$context.attributes['master-id'];
    return this._render();
};


/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
BlockCallbackRequestPopup.prototype.handleSubmit = function (event) {
    event.preventDefault();
    event.stopPropagation();
    this.data = serializeForm($(this.formID).serializeArray());
    this.data['masterID'] = this.masterID;
    this.$context.sendAction('send', this.data);
};
