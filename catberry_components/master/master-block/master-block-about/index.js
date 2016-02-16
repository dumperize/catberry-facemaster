'use strict';

module.exports = MasterBlockAbout;

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

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
MasterBlockAbout.prototype.render = function () {
    return this.$context.getStoreData()
        .then(function (data) {
            function replaceRawText(text) {
                var tmp;
                tmp = text.replace(/\r\n\r\n/g, "</p><p>").replace(/\n\n/g, "</p><p>");
                tmp = tmp.replace(/\r\n/g, "<br>").replace(/\n/g, "<br>");
                return '<p>' + tmp + '</p>';
            }
            if (!data.about) {

                data.aboutEduc = replaceRawText(data.aboutEduc);
                data.aboutExp = replaceRawText(data.aboutExp);
                data.aboutAddInfo = replaceRawText(data.aboutAddInfo);
            } else {
                data.about = replaceRawText(data.about);
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
