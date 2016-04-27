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
    $('.js-photo-upload').click(function () {
        var selector = $(this).attr('href');   //передаем в переменную уникальный id из адресса ссылки
        $(selector).find('.js-open-file').trigger('click'); //при клике на ссылке, происходит клик по лейблу с файл инпутом
        return false;
    });
    $('.js-photo-upload-btn').click(function () {
        $(this).parents('.img-upload').first().find('.js-open-file').trigger('click'); //при клике на кнопку, происходит клик по лейблу с файл инпутом
        return false;
    });
    $('.js-input-photo').change(function (e) {
        var file = e.target.files[0];
        var id = '#' + $(this).parents('.img-upload').first().attr('id');
        canvasResize(file, {
            width: 800,
            height: 0,
            crop: false,
            quality: 100,
            //rotate: 90,
            callback: function (data, width, height) {
                if (width >= 220 && height >= 220) {
                    initCropit(id);                                         //Инициализация cropit
                    $(id).find(id + '-cropper').cropit('imageSrc', data);   //передаем в cropit data (изображение)
                } else {
                    alert('Слишком маленькое изображение.\nВыберите другое изображение.');
                    $(id).find('.js-open-file').trigger('click');     //снова просим выбрать файл
                }
            }
        });
    });
//Инициализация cropit и jquery-ui slider
    function initCropit(selector) {
        var cropitSelector = selector + '-cropper';
        $(selector).find('.cropit-slider').slider({
            min: 0,
            max: 1,
            step: 0.01
        });
        $(cropitSelector).cropit({
            imageBackground: true,
            onImageLoaded: function (object) {
                openImgUpload(selector);
                $(selector).find('.cropit-slider').slider('option', 'min', $(cropitSelector).cropit('zoom'));
                $(selector).find('.cropit-slider').slider('option', 'value', $(cropitSelector).cropit('zoom'));
            }
        });
    }

//Передаем значение value из jquery-ui slider в cropit для увел./умен. изображения
    $('.cropit-slider').on('slide', function (event, ui) {
        $(this).parents('.image-cropper').first().cropit('zoom', ui.value);
        $(this).parents('.image-cropper').first().cropit('zoom', ui.value);
    });
//Загрузка данных на сервер и вставка обрез. изображения в аватарку до загрузки на сервер
    $('.js-download-image-btn').click(function () {
            var data = $(this).closest('.img-upload').find('.image-cropper').first().cropit('export');
            //$.ajax({
            //    url: $(this).children('a').attr('href'),
            //    dataType: 'json',
            //    type: 'GET', //важно! заменить на POST!
            //    data: {
            //        //img: data
            //    },
            //    success: function (response) {
            //        if (response.success) {
            //            saveImgOnPage(this, data);
            //        }
            //    }.bind($(this))
            //});
            //$('.master-data-edit__avatar').attr('src', data);
            $('.js-cropit-photo-result').prepend('<img src="' + data + '" alt="">');
            closeImgUpload(this);
            return false;
        }
    );
//Закрытые псевдоокна
    $('.js-close-ico').click(function () {
        closeImgUpload(this);
    });
    function openImgUpload(selector) {
        if ($(selector).is(':hidden')) {
            $('body').addClass('blackout');
            if ($(selector).closest('.master-data-edit__section-cont').hasClass('edit')) {
                $(selector).closest('.master-data-edit__section-cont').removeClass('edit').find('form').hide();
            }
            $(selector).css('z-index', '1001');
            $(selector).show();
            //alert($(selector).offset().top);
            $('html, body').animate({
                scrollTop: $(selector).offset().top - 20
            }, 1000);
        }
    }

    function closeImgUpload(selector) {
        $(selector).closest('.img-upload').css('display', 'none');
        $(selector).closest('.img-upload').find('form').trigger('reset');
        if ($(selector).closest('.master-data-edit__section-cont').hasClass('master-data-edit__section-cont')) {
            $(selector).closest('.master-data-edit__section-cont').addClass('edit').find('form').show();
        } else {
            $('body').removeClass('blackout');
        }
    }

    function saveImgOnPage(btnSelector, data) {
        var idImgSave = '#' + btnSelector.closest('.img-upload').attr('id') + '-save';
        //console.log($(idImgSave).children().is('img'));
        //if (!$(idImgSave).children('img').is('img')) {
        //    $(idImgSave).append('<img>');
        //}
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
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
ImgUpload.prototype.unbind = function () {

};
