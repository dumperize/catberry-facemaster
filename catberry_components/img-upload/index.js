'use strict';

module.exports = ImgUpload;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "img-upload" component.
 * @constructor
 */
function ImgUpload() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
ImgUpload.prototype.render = function () {

};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
ImgUpload.prototype.bind = function () {
    return {
        click: {
            '.js-photo-upload-btn': this._photoUpload,
            '.js-close-ico': this._close,
            '.js-download-image-btn': this._saveImg,
            '.js-rotate-ccw-btn': this._rotateImgRight,
            '.js-rotate-cw-btn': this._rotateImgLeft
        },
        change: {
            '.js-input-photo': this._fileInputChange
        },
        mousedown: {
            '.cropit-image-preview': this._cursorViewGrabbing
        },
        mouseup: {
            '.cropit-image-preview': this._cursorViewDefault
        }
    };
};

// Передача обработаного изображения в обработчик компонента который вызвал текущий компонент
ImgUpload.prototype._saveImg = function (event) {
    event.preventDefault();
    event.stopPropagation();

    var callcompid = this.$context.attributes.callcompid;
    var img = $(this.$context.element.querySelector('.image-cropper')).cropit('export');

    this.$context.getComponentById(callcompid)._imgResizeResult(img);
    this._close();
};

ImgUpload.prototype._close = function (event) {
    var self = this;
    var callcompid = '#' + this.$context.attributes.callcompid;

    $('html, body').animate({
        scrollTop: $(callcompid).offset().top - 20
    }, 1000, function () {
        self.$context.element.remove();
        self.$context.collectGarbage();
    });
    $('#bg-dark-layer').animate({
        opacity: 0
    }, 600, function () {
        $(this).hide();
    });
    $(this.$context.element.querySelector('.img-upload')).animate({opacity: 0}, 600);
};

ImgUpload.prototype._rotateImgRight = function () {
    $(this.$context.element.querySelector('.image-cropper')).cropit('rotateCW');
};
ImgUpload.prototype._rotateImgLeft = function () {
    $(this.$context.element.querySelector('.image-cropper')).cropit('rotateCCW');
};

//TODO не работает
//При клике на cropit-image-preview меняем вид курсора
ImgUpload.prototype._cursorViewGrabbing = function (event) {
    console.log('cursorViewGrabbing');
    $(this.$context.element.querySelector('.cropit-preview')).addClass('grabbing');
};
ImgUpload.prototype._cursorViewDefault = function (event) {
    console.log('cursorViewDefault');
    $(this.$context.element.querySelector('.cropit-preview')).removeClass('grabbing');
};

ImgUpload.prototype._photoUpload = function (event) {
    event.preventDefault();
    event.stopPropagation();
    $(this.$context.element.querySelector('.js-open-file')).trigger('click');
};

//при изменении значения файл инпута уменьшаем большую фотографию и передаем её в cropit
ImgUpload.prototype._fileInputChange = function (e) {
    var file = e.target.files[0];
    var cropitElement = this.$context.element.querySelector('.image-cropper');
    var self = this;
    var newWidth = this.$context.attributes.width || 220;
    var newHeight = this.$context.attributes.height || 220;
    var zoom = this.$context.attributes.exportzoom || 1;

    canvasResize(file, {
        width: 800,
        height: 0,
        crop: false,
        quality: 100,
        //rotate: 90,
        callback: function (data, width, height) {
            if (width >= (newWidth * zoom) && height >= (newHeight * zoom)) {
                self._initCropit(newWidth, newHeight, zoom);    //Инициализация cropit
                $(cropitElement).cropit('imageSrc', data);      //передаем в cropit data (изображение)
            } else {
                alert('Слишком маленькое изображение.\nВыберите другое изображение.');
                $(id).find('.js-open-file').trigger('click');   //снова просим выбрать файл
            }
        }
    });
};

// Инициализация cropit и jquery-ui slider
ImgUpload.prototype._initCropit = function (newWidth, newHeight, zoom) {
    var cropitElement = this.$context.element.querySelector('.image-cropper');
    var cropitSliderElement = this.$context.element.querySelector('.cropit-slider');
    var self = this;

    $(cropitSliderElement).slider({
        min: 0,
        max: 1,
        step: 0.005,
        slide: function(event, ui) {
            $(cropitElement).cropit('zoom', ui.value); // Передаем значение value из slider в cropit для увел./умен. изображения
        }
    });
    $(cropitElement).cropit({
        type: 'image/jpeg',
        quality: .9,
        imageBackground: true,
        width: newWidth,
        height: newHeight,
        exportZoom: zoom,
        onImageLoaded: function (object) {
            self._openImgUpload();
            $(self.$context.element.querySelector('.cropit-preview-container')).css({
                width: newWidth,
                height: newHeight
            });
            // Устанавливаем начальные значение min и value из cropit в slider для корректного увел./умен. изображения
            $(cropitSliderElement).slider({
                'min': $(cropitElement).cropit('zoom'),
                'max': ($(cropitElement).cropit('maxZoom') / zoom),
                'value': $(cropitElement).cropit('zoom')
            });
        }
    });
};

//Открываем контейнер с компонентом
ImgUpload.prototype._openImgUpload = function (selector) {
    var imgUpload = $('.img-upload');
    if (imgUpload.is(':hidden')) {
        $('body').addClass('blackout');
        imgUpload.css('z-index', '1001');
        imgUpload.show();
        $('html, body').animate({
            scrollTop: imgUpload.offset().top - 20
        }, 1000);
        $('#bg-dark-layer').show().animate({
            opacity: 1
        }, 600);
    }
};
/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
ImgUpload.prototype.unbind = function () {

};
