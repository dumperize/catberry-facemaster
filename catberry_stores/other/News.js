'use strict';

module.exports = News;

var util = require('util'),
    StorePaginator = require('../../lib/StorePaginator');

util.inherits(News, StorePaginator);

function News() {
    StorePaginator.call(this);
    this._path = encodeURI('http://api-fm.present-tlt.ru/about-news/index?filter=[["=","status","1"]]&page=');
    this._url = "/news/page/";
}