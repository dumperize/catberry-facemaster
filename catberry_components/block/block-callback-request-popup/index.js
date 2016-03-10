'use strict';

module.exports = BlockCallbackRequestPopup;
var serializeForm = require("../../../lib/util/SerializeForm");

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

}

BlockCallbackRequestPopup.prototype.masterID = null;
BlockCallbackRequestPopup.prototype.formID = null;
BlockCallbackRequestPopup.prototype.data = null;


/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
BlockCallbackRequestPopup.prototype.render = function () {
    var self = this;
    this.masterID = this.$context.attributes['master-id'];

    return this.$context.getStoreData()
        .then(function (data) {
            data.form = self.data;
            return data;
        })
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
BlockCallbackRequestPopup.prototype.bind = function () {
    this.formID = this.$context.element.querySelector('#callback-request-popup-form');
    return {
        submit: {
            '.callback-popup__form': this.handleSubmit
        }
    }
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
