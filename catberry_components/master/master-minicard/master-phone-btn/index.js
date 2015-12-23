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
    return {
        "contacts": {
            "id": 439,
            "ownerType": 1,
            "ownerID": 1005,
            "phone": "365151",
            "workPhone": "",
            "email": "avista-tlt@yandex.ru",
            "addr": "Степана Разина 4А, 3 этаж, оф. 4, Дон",
            "addrCoord": "",
            "skype": "",
            "icq": ""
        },
        "page": {
            "id": 4395,
            "masterID": 1005,
            "transactionID": 0,
            "dateStart": "2015-07-01",
            "dateEnd": "2015-12-28",
            "number": 1005,
            "sales": 0,
            "articles": 0,
            "albums": 0,
            "videos": 0,
            "comments": 1,
            "services": 8,
            "links": 0
        }
    }
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
