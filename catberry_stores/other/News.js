'use strict';

module.exports = News;

var util = require('util'),
    StorePaginator = require('../../lib/StorePaginator');

util.inherits(News, StorePaginator);

function News() {
    StorePaginator.call(this);
    this._path = this._config.api + '/about-news';
    this._options = {
        data: {
            filter: '["and",["=","status","1"]]',
            order: 'date DESC'
        }
    };
    this._url = "/news/page/";
}