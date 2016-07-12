'use strict';

module.exports = NewsAdd;

var util = require('util'),
    StoreForm = require('../../lib/StoreForm');

/**
 * наследуемся от базового стора
 */
util.inherits(NewsAdd, StoreForm);


/**
 * Creates new instance of the "user/Auth" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function NewsAdd() {
    StoreForm.call(this);
    this._path = '/about-news/submit-news';
}

NewsAdd.prototype.handleFileUpload = function (data) {
    return this.$context.sendAction('FileUpload', 'load', data);
};
