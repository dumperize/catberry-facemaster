'use strict';

module.exports = MasterPhoneBtn;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "master-phone-btn" component.
 * @constructor
 */
function MasterPhoneBtn() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
MasterPhoneBtn.prototype.render = function () {
    return this.$context.attributes;
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
MasterPhoneBtn.prototype.bind = function () {
    return {
        click: {
            '.js-show-phone': this._clickPhoneHandler,
            '.js-close-tip': this._clickCloseTipHandler
        }
    }
};

MasterPhoneBtn.prototype._clickPhoneHandler = function (obj) {
    var el = obj.target;
    $(el).hide();
    $(el).siblings('.js-show-phone-details').show();
    $(el).closest('.master-minicard').find('.js-master-phone-tip').fadeIn(400).delay(4000).fadeOut(500);
};
MasterPhoneBtn.prototype._clickCloseTipHandler = function (obj) {
    var el = obj.target;
    $(el).closest('.js-master-phone-tip').stop().fadeOut(500);
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
MasterPhoneBtn.prototype.unbind = function () {

};
