'use strict';

module.exports = Social;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "social" component.
 * @constructor
 */
function Social() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
Social.prototype.render = function () {
  return [
    {
      url: 'http://vk.com/fm_mf',
      ico: 'vk2'
    },
    {
      url: 'http://www.facebook.com/face.mast',
      ico: 'fb2'
    },
    {
      url: 'http://www.odnoklassniki.ru/facemaster',
      ico: 'ok2'
    },
    {
      url: 'http://twitter.com/FacemasterRu',
      ico: 'tw2'
    }
  ];
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
Social.prototype.bind = function () {

};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
Social.prototype.unbind = function () {

};
