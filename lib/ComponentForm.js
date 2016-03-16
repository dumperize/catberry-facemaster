module.exports = FormComponent;

function FormComponent() {

}
FormComponent.prototype.data = null;
FormComponent.prototype.error = null;

FormComponent.prototype.render = function () {
    return this._render();
};

FormComponent.prototype._render = function () {
    var self = this;

    return this.$context.getStoreData()
        .then(function (data) {
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

FormComponent.prototype.showErrors = function () {
    var self = this;
    if (this.error) {
        this.error.forEach(function (item) {
            var input = self.$context.element.querySelector('[name=' + item.field + ']');
            $(input).parent().addClass('input-error').append('<p class="standard-error">' + item.message + '</p>');
        });
    }
};