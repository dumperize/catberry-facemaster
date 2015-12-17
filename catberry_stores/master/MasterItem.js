'use strict';

module.exports = MasterItem;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "master/MasterItem" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function MasterItem($uhr) {
    this._uhr = $uhr;
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
MasterItem.prototype._uhr = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
MasterItem.prototype.$lifetime = 60000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
MasterItem.prototype.load = function () {
    var self = this;
    var id = this.$context.state.item;
    if (!id)
        return;

    return
    //var path = 'http://api-fm.present-tlt.ru/master';
    //var option = {
    //    data: {
    //        filter: '[["=", "id", "' + id + '"]]',
    //        expand: 'contacts,articles,comments,districts,albums,sales,schedule,videos,workCondition,callbacks,page,vkLikes,rubrika,tags'
    //    }
    //};
    //return this._uhr.get(path, option)
    //    .then(function (result) {
    //        if (result.status.code >= 400 && result.status.code < 600) {
    //            throw new Error(result.status.text);
    //        }
    //        if (result.content.length == 0)
    //            self.$context.notFound();
    //
    //        return result.content[0];
    //    });
};

/**
 * Handles action named "some-action" from any component.
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
MasterItem.prototype.handleSomeAction = function () {
    // Here you can call this.$context.changed() if you know
    // that remote data source has been changed.
    // Also you can have many handle methods for other actions.
};
