'use strict';

module.exports = PageRecovery;
var ComponentForm = require("../../../lib/ComponentForm");

var util = require('util');
util.inherits(PageRecovery, ComponentForm);
/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "page-login" component.
 * @constructor
 */
function PageRecovery() {
    ComponentForm.call(this);

    this.formID = '#recovery-pass-form';
}

PageRecovery.prototype.render = function () {
    var self = this;

    return this._render()
        .then(function (data) {
            var keycaptcha = self._makeKey();
            if (data.form) {
                data.form.clientID = keycaptcha;
            }
            data.keycaptcha = keycaptcha;
            console.log(data);
            return data;
        });
};

PageRecovery.prototype.bind = function () {
    var arr = this._bind();
    arr.click = {
        '.recovery-pass-form__reload-link': this.hadleChangeCaptha
    };
    return arr;
};

PageRecovery.prototype._makeKey = function () {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 30; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    var date = new Date();
    text += date.getTime();
    return text;
};

PageRecovery.prototype.hadleChangeCaptha = function (event) {
    event.preventDefault();
    event.stopPropagation();
    var capcha = this.$context.element.querySelector('.recovery-pass-form__capcha-img');
    var key = this._makeKey();

    capcha.src = capcha.src.slice(0, capcha.src.indexOf('=') + 1) + key;
    this.$context.element.querySelector('.recovery-pass-form__client-id').value = key;
};