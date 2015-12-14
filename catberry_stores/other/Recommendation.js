'use strict';

module.exports = Recommendation;

var util = require('util'),
    StorePaginator = require('../../lib/StorePaginator');

util.inherits(Recommendation, StorePaginator);

function Recommendation() {
    StorePaginator.call(this);
    this._path = 'http://api-fm.present-tlt.ru/about-comment?page='
    this._url = "/recommendation/page/";
}