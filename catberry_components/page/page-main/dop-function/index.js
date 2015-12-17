'use strict';

module.exports = DopFunction;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "dop-function" component.
 * @constructor
 */
function DopFunction() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
DopFunction.prototype.render = function () {
    return {
        "menuMaster": [
            {
                "url": "/registration",
                "title": "Стать Мастером",
                "icon": true
            },
            {
                "url": "/recommendation",
                "title": "Мастера о сайте"
            }
        ],
        "menuAbout": [
            {
                "url": "/news",
                "title": "Новости"
            },
            {
                "url": "/vacancy",
                "title": "Вакансии"
            }
        ],
        "menuBayda": [
            {
                "url": "/404",
                "title": "Конкурсы газеты Презент"
            },
            {
                "url": "/404",
                "title": "Маршрутки Тольятти с 01.01.2015"
            },
            {
                "url": "/404",
                "title": "Дачные перевозки"
            },
            {
                "empty": true
            }
        ]
    }
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
DopFunction.prototype.bind = function () {

};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
DopFunction.prototype.unbind = function () {

};