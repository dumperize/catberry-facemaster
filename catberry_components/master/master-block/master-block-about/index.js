'use strict';

module.exports = MasterBlockAbout;
var Typograf = require('typograf');

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "master-block-about" component.
 * @constructor
 */
function MasterBlockAbout() {
    this.tp = new Typograf({lang: 'ru'});
}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
MasterBlockAbout.prototype.render = function () {
    var self = this;

    return this.$context.getStoreData()
        .then(function (data) {
            function replaceRawText(text) {
                var tmp;
                tmp = text.replace(/\r\n\r\n/g, "</p><p>").replace(/\n\n/g, "</p><p>");
                tmp = tmp.replace(/\r\n/g, "<br>").replace(/\n/g, "<br>");
                if (tmp) {
                    return '<p>' + tmp + '</p>';
                }
            }
            if (!data.about) {
                data.aboutEduc = self.tp.execute(replaceRawText(data.aboutEduc));
                data.aboutExp = self.tp.execute(replaceRawText(data.aboutExp));
                data.aboutAddInfo = self.tp.execute(replaceRawText(data.aboutAddInfo));
            } else {
                data.about = self.tp.execute(replaceRawText(data.about));
            }
            return {
                aboutEduc: data.aboutEduc,
                aboutExp: data.aboutExp,
                aboutAddInfo: data.aboutAddInfo,
                about: data.about
            }
        });
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
MasterBlockAbout.prototype.bind = function () {

};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
MasterBlockAbout.prototype.unbind = function () {

};
