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

/**
 * Элемент DOM для текста заявки
 * @type {null}
 */
PageRequest.prototype.textareaElement = null;

/**
 * Элемент DOM для контактов
 * @type {null}
 */
PageRequest.prototype.contactElement = null;

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
PageRequest.prototype.bind = function () {
    //какие-то магические штуки для поля
    var ta = $('textarea');
    autosize(ta);

    //устанавливаем DOM элементы в нашем объекте
    this.textareaElement = this.$context.element.querySelector('#request-form-text');
    this.contactElement = {
        name: this.$context.element.querySelector('#request-form-contact-name'),
        phone: this.$context.element.querySelector('#request-form-contact-phone'),
        email: this.$context.element.querySelector('#request-form-contact-email')
    };

    //возвращаем обработчики событий
    return {
        submit: {
            '.callback_request__form': this.handleSubmit
        },
        click: {
            '.js-show-tip': this._clickInfoHandler,
            '.js-close-tip': this._clickCloseTipHandler
        }
    }
};

PageRequest.prototype._clickInfoHandler = function (obj) {
    event.preventDefault();
    event.stopPropagation();
    var el = obj.target;
    $(el).children().fadeIn(400).delay(30000).fadeOut(500);
};
PageRequest.prototype._clickCloseTipHandler = function (obj) {
    event.preventDefault();
    event.stopPropagation();
    var el = obj.target;
    $(el).closest('.callback_request__tip').stop().fadeOut(500);
};

PageRequest.prototype.handleSubmit = function (event) {
    var self = this;
    event.preventDefault();
    event.stopPropagation();

    //TODO: можно сделать автоматический сбор данных для отправки
    //собираем данные по форме и отправляем Store
    this.$context.sendAction('send', {
        'RequestForm[text]': this.getTextArea(),
        'RequestForm[contactName]': this.getContact('name'),
        'RequestForm[contactPhone]': this.getContact('phone'),
        'RequestForm[contactEmail]': this.getContact('email')
    })
        //получаем ответ от стора
        .then(function (data) {
            //выбираем DOM по нужным элементам
            var form = self.$context.element.querySelector('.callback_request');
            var errElement = self.$context.element.querySelector('.callback_request__errors');
            var success = self.$context.element.querySelector('.success_response');

            //обнуляем для повторной отправки
            errElement.innerHTML = '';
            self.clearDOM();

            //если провал отправки формы
            if (!data.success) {
                var text = [];
                //переберем все ошибки
                data.error.forEach(function (el) {
                    //соберем их в строку TODO: оформить css для этих ошибок
                    text.push('<p>' + el.message + '</p>');

                    //расскрасим поля красным
                    if (el.field == 'text') {
                        self.textareaElement.style.border = '1px solid red';
                    } else {
                        self.contactElement[el.field].style.border = '1px solid red';
                    }

                });
                //выведем все ошибки вверх формы
                errElement.innerHTML = text.join('');
            }
            //форма отправлена УРА
            else {
                //скроем всю форму
                form.innerHTML = '';
                //отобразим блок успеха
                success.style.display = 'block';
            }
        });
    //это вариант работы напрямую с DOM без сохранения состояния в сторе и вызова changed()
    //т.е. форму можно реализовывать по другому, для сложных конструкция такой подход не хорош.
    //также для следующих форм не стоит разделять элементы формы по разным переменным, лучше сделать одним массивом
    // и работать с ним, также соблюдать одинаковость имен
};

/**
 * Gets textares of callback.
 * @returns {string} Current value in textarea.
 */
PageRequest.prototype.getTextArea = function () {
    return this.textareaElement.value;
};
/**
 * Получить данные заполненные в контактах
 * @param key
 * @returns {*}
 */
PageRequest.prototype.getContact = function (key) {
    return this.contactElement[key].value;
};

/**
 * Зачистка стилей для полей
 * @param key
 */
PageRequest.prototype.clearDOM = function (key) {
    var self = this;
    this.textareaElement.style.border = '';
    Object.keys(this.contactElement).forEach(function (key) {
        self.contactElement[key].style.border = '';
    });
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
