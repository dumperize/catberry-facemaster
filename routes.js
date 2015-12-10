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
        expression: /^\/\w+\/page\/\d+/i,
        map: function (uri) {
            var matches = uri.path.match(/^\/\w+\/page\/\d+/i);
            console.log(matches);
            return {
                Pages: {
                    orderId: Number(matches[2])
                }
            };
        }
    },
    '/:rubrika[Pages]/:podrubrika[rubrika/Rubrika]',
    {
        expression: '/:rubrika[Pages]/:podrubrika[rubrika/Rubrika]/:param[SeoText]',
        map: function (state) {
            var section = ['video', 'sale', 'sovety', 'company'];
            var isSection;
            for (var i = 0; i < section.length; ++i) {
                if (state.SeoText.param == section[i]) {
                    state.SeoText.section = section[i];
                    isSection = true;
                }
            }
            if (!isSection) {
                state.SeoText.tag = state.SeoText.param;
            }
            return state;
        }
    },
    '/:rubrika[Pages]/:podrubrika[rubrika/Rubrika]/:tag[SeoText]/:section[SeoText]',
    {
        expression: /^\/\w+\/page\/\d+/i,
        map: function (urlPath) {
            console.log(urlPath.path);
            var matches = urlPath.path.match(/^\/\w+\/page\/\d+/i);
            var posPage = urlPath.path.indexOf('/page/')
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
    }
];
