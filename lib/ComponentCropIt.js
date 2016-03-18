module.exports = ComponentCropIt;

function ComponentCropIt() {

}
ComponentCropIt.prototype._photoCropIt = function (event, data, f) {
    event.preventDefault();
    event.stopPropagation();

    var self = this;

    this.$context.createComponent('img-upload', data)
        .then(function (data) {
            f.call(self, data);
            $(self.$context.element.querySelector('.js-open-file')).trigger('click');
            return data;
        });
};