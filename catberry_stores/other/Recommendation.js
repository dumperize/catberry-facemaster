'use strict';

module.exports = Recommendation;

var util = require('util'),
    StorePaginator = require('../../lib/StorePaginator');

util.inherits(Recommendation, StorePaginator);

function Recommendation() {
    StorePaginator.call(this);
    this._path = this._config.api + '/about-comment';
    this._url = "/recommendation/page/";
}