'use strict';

module.exports = MasterBlockLink;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "master-block-link" component.
 * @constructor
 */
function MasterBlockLink() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
MasterBlockLink.prototype.render = function () {
    return this.$context.getStoreData()
        .then(function (data) {
            data.contacts.links = JSON.parse(data.contacts.links);
            Object.keys(data.contacts.links).forEach(function (key) {
                var link = data.contacts.links[key];
                if (link != '' && link.indexOf('http://') == -1 && link.indexOf('https://') == -1) {
                    data.contacts.links[key] = 'http://' + link;
                }
            });
            return {
                links: data.contacts.links
            }
        });
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
MasterBlockLink.prototype.bind = function () {

};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
MasterBlockLink.prototype.unbind = function () {

};
