'use strict';

module.exports = MasterVideo;

var util = require('util'),
    StorePaginator = require('../../lib/StorePaginator');

util.inherits(MasterVideo, StorePaginator);

function MasterVideo() {
    StorePaginator.call(this);
    this._path = 'http://api-fm.present-tlt.ru/video/active';
    this._options = {
        data: {
            order: 'id DESC'
        }
    };
    this._url = "/video/page/";
    this._catalog = this.$context.state.catalog;
    if (this._catalog) {
        this._options.data.filter = '[["=","rubrikaID","' + this._catalog + '"]]';
        this._url = "/video/catalog/" + this._catalog + "/page/";
    }
}