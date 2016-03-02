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

PageRequest.prototype.textareaElement = null;

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
PageRequest.prototype.bind = function () {
    var ta = $('textarea');
    autosize(ta);

    this.textareaElement = this.$context.element.querySelector('#request-form-text');
    this.contactElement = {
        name: this.$context.element.querySelector('#request-form-contact-name'),
        phone: this.$context.element.querySelector('#request-form-contact-phone'),
        email: this.$context.element.querySelector('#request-form-contact-email')
    };
    return {
        submit: {
            '.callback_request__form': this.handleSubmit
        }
    }
};

PageRequest.prototype.handleSubmit = function (event) {
    var self = this;
    event.preventDefault();
    event.stopPropagation();

    //TODO: можно сделать автоматический сбор данных для отправки
    this.$context.sendAction('send', {
        'RequestForm[text]': this.getTextArea(),
        'RequestForm[contactName]': this.getContact('name'),
        'RequestForm[contactPhone]': this.getContact('phone'),
        'RequestForm[contactEmail]': this.getContact('email')
    })
        .then(function (data) {
            var form = self.$context.element.querySelector('.callback_request');
            var errElement = self.$context.element.querySelector('.callback_request__errors');
            var success = self.$context.element.querySelector('.success_response');

            errElement.innerHTML = '';
            self.textareaElement.style.border = '';

            if (!data.success) {
                var text = [];
                data.error.forEach(function (el) {
                    text.push('<p>' + el.message + '</p>');
                });
                errElement.innerHTML = text.join('');
                self.textareaElement.style.border = '1px solid red';
            } else {
                form.innerHTML = '';
                success.style.display = 'block';
            }
        });
};

/**
 * Gets textares of callback.
 * @returns {string} Current value in textarea.
 */
PageRequest.prototype.getTextArea = function () {
    return this.textareaElement.value;
};

PageRequest.prototype.getContact = function (key) {
    return this.contactElement[key].value;
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
