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
    {
        expression: '/:rubrika[rubrika/Rubrika]/:podrubrika[rubrika/Rubrika]',
        map: function (state) {
            state.Pages = {page: "rubrika"};
            return state;
        }
    },
    {
        expression: '/:rubrika[rubrika/Rubrika]/:podrubrika[rubrika/Rubrika]/:param[Tag]',
        map: function (state) {
            var section = ['video', 'sale', 'sovety', 'company'];
            var isSection;
            for (var i = 0; i < section.length; ++i) {
                if (state.Tag.param == section[i]) {
                    state.Tag.section = section[i];
                    isSection = true;
                }
            }
            if (!isSection) {
                state.Tag.tag = state.Tag.param;
            }
            state.Pages = {page: "rubrika"};
            return state;
        }
    },
    {
        expression: '/:rubrika[rubrika/Rubrika]/:podrubrika[rubrika/Rubrika]/:tag[Tag]/:section[Tag]',
        map: function (state) {
            state.Pages = {page: "rubrika"};
            return state;
        }
    },
    {
        expression: /^\/\w+\/page\/\d+/i,
        map: function (urlPath) {
            console.log(urlPath.path);
            var matches = urlPath.path.match(/^\/\w+\/page\/\d+/i);
            var posPage = urlPath.path.indexOf('/page/');
            var posID = posPage + 6;
            return {
                Pages: {
                    page: urlPath.path.slice(1, posPage)
                },
                Paginator: {
                    currentPage: urlPath.path.slice(posID)
                }
            };
        }
    },
    {
        expression: /^\/news\/item\/\d+/i,
        map: function (urlPath) {
            console.log("");
            console.log("");
            console.log("");
            console.log(urlPath.path);
            console.log("");
            var matches = urlPath.path.match(/^\/news\/item\/\d+/i);
            var posID = urlPath.path.indexOf('/item/') + 6;
            return {
                Pages: {
                    news: "news-item"
                },
                'other/NewsItem': {
                    id: urlPath.path.slice(posID)
                }
            };
        }
    }
];
