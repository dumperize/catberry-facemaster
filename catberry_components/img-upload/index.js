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
    var unique = this.$context.attributes.unique;

    $('.js-photo-upload-btn').click(function () {
        $(this).parents('.img-upload').first().find('.js-open-file').trigger('click'); //при клике на кнопку, происходит клик по лейблу с файл инпутом
        return false;
    });

//Передаем значение value из jquery-ui slider в cropit для увел./умен. изображения
    $('.cropit-slider').on('slide', function (event, ui) {
        $(this).parents('.image-cropper').first().cropit('zoom', ui.value);
        $(this).parents('.image-cropper').first().cropit('zoom', ui.value);
    });
//Загрузка данных на сервер и вставка обрез. изображения в аватарку до загрузки на сервер
    $('.js-download-image-btn').click(function () {
            var data = $(this).closest('.img-upload').find('.image-cropper').first().cropit('export');
            $('.' + unique + '-result').prepend('<img src="' + data + '" alt="">');
            closeImgUpload(this);
            return false;
        }
    );
//Закрытые псевдоокна
    $('.js-close-ico').click(function () {
        closeImgUpload(this);
    });

    function closeImgUpload(selector) {
        $(selector).closest('.img-upload').css('display', 'none');
        $(selector).closest('.img-upload').find('form').trigger('reset');
        $('body').removeClass('blackout');
    }

    function saveImgOnPage(btnSelector, data) {
        var idImgSave = '#' + btnSelector.closest('.img-upload').attr('id') + '-save';

        $(idImgSave).append('<img class="mde-new-image">');
        $(idImgSave).children('img').last().attr('src', data); //вставка обрез. изображения в аватарку
        $(idImgSave).children('img').last().fadeIn(500, function () {
            if (1 < $(idImgSave).children('img').length) {
                $(idImgSave).children('img').first().remove();
            }
        });
    }

//При клике на cropit-image-preview меняем вид курсора
    $('.cropit-image-preview').mousedown(function () {
        $('.cropit-image-preview').addClass('grabbing');

    });
    $('.cropit-image-preview').mouseup(function () {
        $('.cropit-image-preview').removeClass('grabbing');
    });
    return {
        click: {
            '.js-photo-upload': this._photoUpload
        },
        change: {
            '.js-input-photo': this._fileInputChange
        }
    };
};

//при изменении значения файл инпута уменьшаем большую фотографию и передаем её в cropit
ImgUpload.prototype._fileInputChange = function (e) {
    var file = e.target.files[0];
    var id = this.$context.attributes.id;
    var cropitElement = this.$context.element.querySelector('.image-cropper');
    var self = this;

    canvasResize(file, {
        width: 800,
        height: 0,
        crop: false,
        quality: 100,
        //rotate: 90,
        callback: function (data, width, height) {
            if (width >= 220 && height >= 220) {
                self._initCropit(id);                  //Инициализация cropit
                $(cropitElement).cropit('imageSrc', data);   //передаем в cropit data (изображение)
            } else {
                alert('Слишком маленькое изображение.\nВыберите другое изображение.');
                $(id).find('.js-open-file').trigger('click');     //снова просим выбрать файл
            }
        }
    });
};

//Инициализация cropit и jquery-ui slider
ImgUpload.prototype._initCropit = function (selector) {
    var cropitElement = this.$context.element.querySelector('.image-cropper');
    var cropitSliderElement = this.$context.element.querySelector('.cropit-slider');
    var self = this;
    console.log(selector);

    $(cropitSliderElement).slider({
        min: 0,
        max: 1,
        step: 0.01
    });
    $(cropitElement).cropit({
        imageBackground: true,
        onImageLoaded: function (object) {
            console.log('!!!');
            self._openImgUpload(selector);
            $(selector).find('.cropit-slider').slider('option', 'min', $(cropitElement).cropit('zoom'));
            $(selector).find('.cropit-slider').slider('option', 'value', $(cropitElement).cropit('zoom'));
        }
    });
    console.log('initCropit');
};

//Открываем контейнер с компонентом
ImgUpload.prototype._openImgUpload = function (selector) {
    console.log('openImgUpload');

    if ($(selector).is(':hidden')) {
        $('body').addClass('blackout');
        $(selector).css('z-index', '1001');
        $(selector).show();
        $('html, body').animate({
            scrollTop: $(selector).offset().top - 20
        }, 1000);
    }
};
/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
ImgUpload.prototype.unbind = function () {
    ('.js-photo-upload').unbind('click');
};
