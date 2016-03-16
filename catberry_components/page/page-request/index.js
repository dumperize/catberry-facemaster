'use strict';

module.exports = PageRequest;
var ComponentForm = require("../../../lib/ComponentForm");

var util = require('util');
util.inherits(PageRequest, ComponentForm);
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
    ComponentForm.call(this);

    this.formID = '#callback-request-form';
}

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
PageRequest.prototype.bind = function () {
    //какие-то магические штуки для поля
    var ta = $('textarea');
    autosize(ta);

    var superClick = this._bind();
    superClick.click = {
        '.js-show-tip': this._clickInfoHandler,
        '.js-close-tip': this._clickCloseTipHandler
    };
    //возвращаем обработчики событий
    return superClick;
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

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
PageRequest.prototype.unbind = function () {
    var ta = document.querySelector('textarea');
    var evt = document.createEvent('Event');
    evt.initEvent('autosize:destroy', true, false);
    ta.dispatchEvent(evt);
};
