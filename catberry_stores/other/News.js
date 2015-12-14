'use strict';

module.exports = News;

var util = require('util'),
    StorePaginator = require('../../lib/StorePaginator');

util.inherits(News, StorePaginator);

function News() {
    StorePaginator.call(this);
    this._path = 'http://api-fm.present-tlt.ru/about-news/index?filter=%5B%5B%22%3D%22%2C%22status%22%2C%221%22%5D%5D&page='
    this._url = "/news/page/";
}