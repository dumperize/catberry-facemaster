'use strict';

module.exports = MasterBlockReviewForm;
var serializeForm = require("../../../../lib/util/SerializeForm");
var ComponentForm = require("../../../../lib/ComponentForm");

var util = require('util');
util.inherits(MasterBlockReviewForm, ComponentForm);

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "master-block-review-form" component.
 * @constructor
 */
function MasterBlockReviewForm() {
    ComponentForm.call(this);
    this.formID = '#add-comment-form';
    this.masterID = this.$context.attributes['master-id'];
}

MasterBlockReviewForm.prototype.masterID = null;

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
MasterBlockReviewForm.prototype.bind = function () {
    //авторазмер для отзывов
    var ta = $('textarea');
    autosize(ta);

    return this._bind();
};

MasterBlockReviewForm.prototype.unbind = function () {
    //Отвяжем авторазмер
    var ta = document.querySelector('textarea');
    var evt = document.createEvent('Event');
    evt.initEvent('autosize:destroy', true, false);
    ta.dispatchEvent(evt);
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
MasterBlockReviewForm.prototype.handleSubmit = function (event) {
    event.preventDefault();
    event.stopPropagation();
    this.data = serializeForm($(this.formID).serializeArray());
    this.data['ownerID'] = this.masterID;
    this.$context.sendAction('send', this.data);
};