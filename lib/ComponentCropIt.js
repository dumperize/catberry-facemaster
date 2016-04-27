module.exports = ComponentCropIt;
var ComponentForm = require("./ComponentForm");

var util = require('util');
util.inherits(ComponentCropIt, ComponentForm);

function ComponentCropIt() {
    ComponentForm.call(this);
}
ComponentCropIt.prototype._photoCropIt = function (event, data, f) {
    event.preventDefault();
    event.stopPropagation();

    var self = this;

    this.$context.createComponent('img-upload', data)
        .then(function (data) {
            f.call(self, data);
            $('.js-open-file').trigger('click');
            return data;
        });
};