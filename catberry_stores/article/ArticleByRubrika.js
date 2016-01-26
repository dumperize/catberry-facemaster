'use strict';

module.exports = ArticleByRubrika;

var util = require('util'),
	StoreCatalog = require('../../lib/StoreCatalog');
/**
 * наследуемся от базового стора каталогов
 */
util.inherits(ArticleByRubrika, StoreCatalog);

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "video/videoByRubrika" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function ArticleByRubrika($uhr) {
	//вызываем базовый Store с параметром video
	StoreCatalog.call(this, "article");
}
