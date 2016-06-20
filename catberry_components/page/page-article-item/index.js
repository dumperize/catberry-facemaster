'use strict';

module.exports = PageArticleItem;
var Typograf = require('typograf');

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "page-article-item" component.
 * @constructor
 */
function PageArticleItem() {
    this.tp = new Typograf({lang: 'ru'});
}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
PageArticleItem.prototype.render = function () {
    var self = this;

    return this.$context.getStoreData()
        .then(function (data) {
            //console.log(data);
            if (data)
                data.text = self.tp.execute(data.text);
            return data;
        });
};
