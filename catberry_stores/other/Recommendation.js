'use strict';

module.exports = Recommendation;

var util = require('util'),
    StorePaginator = require('../../lib/StorePaginator');

util.inherits(Recommendation, StorePaginator);

function Recommendation() {
    StorePaginator.call(this);

    this._path = '/about-comment';
    this._url = "/recommendation/page/";
    this._options = {
        data: {
            order: 'createDate DESC'
        }
    };
}