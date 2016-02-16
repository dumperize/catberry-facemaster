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
    console.log("sdf");
};

PageRequest.prototype.textareaElement = null;
/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
PageRequest.prototype.bind = function () {
    this.textareaElement = this.$context.element.querySelector('textarea');
    return {
        submit: {
            '.callback_request__form': this.handleSubmit
        }
    }


};

PageRequest.prototype.handleSubmit = function (event) {
    event.preventDefault();
    event.stopPropagation();

    this.$context.sendAction('send', {
        'RequestForm[text]': this.getTextArea(),
        'RequestForm[contactName]': 'Test',
        'RequestForm[contactPhone]': '23654623',
        'RequestForm[contactEmail]': 'email'
    });


};

/**
 * Gets textares of callback.
 * @returns {string} Current value in textarea.
 */
PageRequest.prototype.getTextArea = function () {
    return this.textareaElement.value;
};


/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
PageRequest.prototype.unbind = function () {

};
