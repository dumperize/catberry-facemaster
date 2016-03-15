'use strict';

module.exports = PageRecovery;
var serializeForm = require("../../../lib/util/SerializeForm");

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "page-recovery" component.
 * @constructor
 */
function PageRecovery() {

}

PageRecovery.prototype.data = null;

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
PageRecovery.prototype.render = function () {
    var self = this;

    return this.$context.getStoreData()
        .then(function (data) {
            data.form = self.data;
            return data;
        });
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
PageRecovery.prototype.bind = function () {
    console.log(recaptcha);
    this.formID = this.$context.element.querySelector('#recovery-pass-form');
    return {
        submit: {
            '#recovery-pass-form': this.handleSubmit
        }
    }
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
PageRecovery.prototype.handleSubmit = function (event) {
    event.preventDefault();
    event.stopPropagation();
    this.data = serializeForm($(this.formID).serializeArray());
    this.$context.sendAction('send', this.data);
};
