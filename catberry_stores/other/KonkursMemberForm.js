'use strict';

module.exports = KonkursMemberForm;

var util = require('util'),
    StoreForm = require('../../lib/StoreForm');

/**
 * наследуемся от базового стора
 */
util.inherits(KonkursMemberForm, StoreForm);

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "other/KonkursMemberForm" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function KonkursMemberForm($uhr) {
    this._api = 'http://konkurs.facemaster.ru';

    StoreForm.call(this);
    this._path = '/member/add';
}

KonkursMemberForm.prototype.load = function () {
    var self = this;

    return this.$context.getStoreData('other/KonkursListSmall')
        .then(function (data) {
            if (!self.data)
                return {
                    success: false,
                    konkursList: data
                };
            return self.send(self._path, {data: self.data})
                .then(function (res) {
                    self.data = null;
                    return {
                        success: res.success,
                        error: res.error,
                        konkursList: data
                    }
                });
        });

};

KonkursMemberForm.prototype.handleFileUpload = function (data) {
    return this.$context.sendAction('FileUpload', 'load', data);
};
