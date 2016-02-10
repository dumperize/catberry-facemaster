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
            if (!data.about) {
                data.aboutEduc = data.aboutEduc.replace(/\n/g, "<br>");
                data.aboutExp = data.aboutExp.replace(/\n/g, "<br>");
                data.aboutAddInfo = data.aboutAddInfo.replace(/\n/g, "<br>");
            } else {
                data.about = data.about.replace(/\n/g, "<br>");
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
