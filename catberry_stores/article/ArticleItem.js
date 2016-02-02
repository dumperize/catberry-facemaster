'use strict';

module.exports = ArticleItem;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "article/ArticleItem" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function ArticleItem($uhr) {
    this._uhr = $uhr;
    this._path = 'http://api-fm.present-tlt.ru/article';
    this._options = {
        data: {
            expand: 'owner',
            filter: '["and",["=","status","1"]]'
        }
    };
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
ArticleItem.prototype._uhr = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
ArticleItem.prototype.$lifetime = 60000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
ArticleItem.prototype.load = function () {
    var self = this;
    var id = this.$context.state.id;
    var masterID = this.$context.state.masterID;
    if (!id || !masterID)
        this.$context.notFound();

    this._options.data.filter = '["and",["=","status","1"],["=","id","' + id + '"]]'

    return this._uhr.get(this._path, this._options)
        .then(function (result) {
            if (result.status.code >= 400 && result.status.code < 600) {
                throw new Error(result.status.text);
            }

            if ((result.content.length == 0) || (result.content[0].owner.page.masterID != masterID))
                self.$context.notFound();
            console.log(result.content);
            return result.content[0];
        });
};

