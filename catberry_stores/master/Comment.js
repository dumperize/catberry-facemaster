'use strict';

module.exports = Comment;
var Typograf = require('typograf');

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "master/Comment" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function Comment() {
    this._uhr = this.$context.locator.resolve('uhr');
    this._config = this.$context.locator.resolve('config');
    this._api = this._api || this._config.api;
    this.tp = new Typograf({lang: 'ru'});
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
Comment.prototype._uhr = null;
Comment.prototype._config = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
Comment.prototype.$lifetime = 60000;
Comment.prototype.currentPage = 1;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */

Comment.prototype.load = function () {
    var self = this;

    return this.$context.getStoreData('master/MasterPublication')
        .then(function (publication) {
            return publication.masterID;
        })
        .then(function (masterID) {
            return self._uhr.get(self._api + '/comment', {
                data: {
                    order: 'date DESC',
                    limit: 10,
                    page: self.currentPage,
                    filter: JSON.stringify({ownerType: 1, ownerID: masterID, status: 2})
                }
            }).then(function (result) {
                //console.log(result.content);
                if (result.status.code != 200) return false;
                result.content.pageCount = result.status.headers['x-pagination-page-count'];
                result.content.currentPage = result.status.headers['x-pagination-current-page'];
                result.content.forEach(function (item, i) {
                    item.text = self.tp.execute(item.text);
                });
                return {
                    comments: result.content
                }
            })
        });
};

Comment.prototype.handleChangePage = function (page) {
    //console.log(page);
    this.currentPage = page;
    this.$context.changed();
};
