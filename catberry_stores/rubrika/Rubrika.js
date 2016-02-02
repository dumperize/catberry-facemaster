'use strict';

module.exports = Rubrika;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "rubrika/Rubrika" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function Rubrika($uhr) {
    this._uhr = $uhr;
    this._config = this.$context.locator.resolve('config');

    this._url = this._config.api + '/rubrika';
    this._options = {
        data: {
            filter: '["and", ["=", "unique", ""],["=","status","1"]]',
            expand: "tags,parent,nearby,seo,activeBanners,recomendMasters"
        }
    };
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
Rubrika.prototype._uhr = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
Rubrika.prototype.$lifetime = 60000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
Rubrika.prototype.load = function () {
    var self = this;
    var rubrika = this.$context.state.rubrika;
    var podrubrika = this.$context.state.podrubrika;

    if (!podrubrika) {
        self.$context.notFound();
    }
    this._options.data.filter = '["and", ["=", "unique", "' + podrubrika + '"],["=","status","1"]]';

    return this._uhr.get(this._url, this._options)
        .then(function (result) {
            if (result.status.code >= 400 && result.status.code < 600) {
                throw new Error(result.status.text);
            }
            if (result.content.length == 0)
                self.$context.notFound();

            var data = result.content[0];

            if (data.parentID == 0)
                self.$context.notFound();

            if (rubrika != data.parent.unique)
                self.$context.notFound();

            data.podrubrika = podrubrika;
            data.rubrika = rubrika;
            return data;
        });
};