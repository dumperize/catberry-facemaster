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
      mod: 'vk'
    },
    {
      url: 'http://www.facebook.com/face.mast',
      mod: 'fb'
    },
    {
      url: 'http://www.odnoklassniki.ru/facemaster',
      mod: 'ok'
    },
    {
      url: 'http://twitter.com/FacemasterRu',
      mod: 'tw'
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
