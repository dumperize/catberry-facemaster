'use strict';

// jscs:disable maximumLineLength
// This file contains definitions of rules how location URLs are translated
// to "render" methods of catberry's modules.
//
// Format:
// /some/:parameter[module1,module2,module3]
//
// More details here:
// https://github.com/catberry/catberry/blob/master/docs/index.md#url-route-definition

module.exports = [
    '/:page[Pages]',
    //id мастера
    {
        expression: /^\/([\/\d]+)$/i,
        map: function (urlPath) {
            var matches = urlPath.path.match(/^\/([\/\d]+)$/i);
            return {
                'master/MasterItem': {
                    item: matches[1]
                },
                Pages: {
                    page: "master-page"
                }
            }
        }
    },
    //статья мастера
    {
        expression: '/^\/([\/\d]+)\/article\/([\/\d]+)$/i',
        map: function (urlPath) {
            return {
                Pages: {
                    page: "master-article"
                }
            }
        }
    },
    // путь: рубрика/подрубрика
    // путь: рубрика/подрубрика/тег
    // путь: рубрика/подрубрика/секция
    // путь: рубрика/подрубрика/тег/секция
    {
        expression: /^\/([^\/\d]+)\/([^\/\d]+)\/?((?!video|sale|sovety|company)[^\/\d]+)?\/?(video|sale|sovety|company)?$/i,
        map: function (urlPath) {
            var matches = urlPath.path.match(/^\/([^\/\d]+)\/([^\/\d]+)\/?((?!video|sale|sovety|company)[^\/\d]+)?\/?(video|sale|sovety|company)?$/i);
            return {
                'rubrika/Rubrika': {
                    rubrika: matches[1],
                    podrubrika: matches[2]
                },
                Tag: {
                    tag: matches[3],
                    section: matches[4]
                },
                Pages: {
                    page: "master-rubrika"
                }
            }
        }
    },
    // путь: /__/page/:id
    {
        expression: /^\/([^\/\d]+)\/page\/(\d+)/i,
        map: function (urlPath) {
            var matches = urlPath.path.match(/^\/([^\/\d]+)\/page\/(\d+)/i);
            return {
                Pages: {
                    page: matches[1]
                },
                Paginator: {
                    currentPage: matches[2]
                }
            };
        }
    },
    // путь: /sale
    // путь: /sovety
    // путь: /video
    // путь: /__/page/:id
    // путь: /__/category/:id
    // путь: /__/category/:id/page/:id
    {
        expression: /^\/(sale|article|video)(\/catalog\/(\d+))?(\/page\/(\d+))?$/i,
        map: function (urlPath) {
            var matches = urlPath.path.match(/^\/(sale|article|video)(\/catalog\/(\d+))?(\/page\/(\d+))?$/i);
            var nameCapitalizeFirstLetter = matches[1].charAt(0).toUpperCase() + matches[1].slice(1);
            var state = {};

            state.Pages = {
                page: matches[1]
            };
            state['rubrika/Rubrikator' + nameCapitalizeFirstLetter] = {
                catalog: matches[3]
            };
            state.Paginator = {
                currentPage: matches[5]
            };
            return state;
        }
    },
    // путь: /company
    // путь: /company/category/:id
    // путь: /company/:id
    {
        expression: /^\/company((\/catalog\/(\d+))|(\/(\d+)))?$/i,
        map: function (urlPath) {
            var matches = urlPath.path.match(/^\/company((\/catalog\/(\d+))|(\/(\d+)))?$/i);
            var state = {};

            state.Pages = {
                page: matches[3] ? "company-rubrika" : (matches[5] ? "company-page" : "company")
            };
            state['rubrika/RubrikaCompany'] = {
                catalog: matches[3]
            };
            state['company/CompanyItem'] = {
                id: matches[5]
            };
            return state;
        }
    },
    // путь: /news/item/:id
    // путь: /vacancy/item/:id
    // путь: /konkurs/item/:id
    {
        expression: /^\/(news|vacancy|konkurs)\/item\/(\d+)$/i,
        map: function (urlPath) {
            var matches = urlPath.path.match(/^\/(news|vacancy|konkurs)\/item\/(\d+)$/i);
            var state = {};

            var string = matches[1];

            state.Pages = {
                page: string + "-item"
            };
            state['other/' + string.charAt(0).toUpperCase() + string.slice(1) + "Item"] = {
                item: matches[2]
            };
            return state;
        }
    }
];
