module.exports = FormComponent;
var serializeForm = require("./util/SerializeForm");

function FormComponent() {

}

FormComponent.prototype.formID = null;
FormComponent.prototype.formDOM = null;
FormComponent.prototype.data = null;
FormComponent.prototype.error = null;

FormComponent.prototype.render = function () {
    return this._render();
};

FormComponent.prototype._render = function () {
    var self = this;

    return this.$context.getStoreData()
        .then(function (data) {
            if (!data)
                return null;
            if (!data.success) {
                data.form = self.data;
                self.error = data.error;
            } else {
                data.form = '';
                self.error = '';
            }
            return data;
        });
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
FormComponent.prototype.bind = function () {
    return this._bind();
};

FormComponent.prototype._bind = function () {
    this.showErrors();

    this.formDOM = this.$context.element.querySelector(this.formID);
    var arr = {submit: {}};
    arr.submit[this.formID] = this.handleSubmit;

    return arr;
};

FormComponent.prototype.showErrors = function () {
    var self = this;
    if (this.error) {
        this.error.forEach(function (item) {
            var input = self.$context.element.querySelector('[name=' + item.field + ']');
            $(input).parent().addClass('input-error').append('<p class="standard-error">' + item.message + '</p>');
        });
    }
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
FormComponent.prototype.handleSubmit = function (event) {
    event.preventDefault();
    event.stopPropagation();
    this.data = serializeForm($(this.formDOM).serializeArray());
    this.$context.sendAction('send', this.data);
};