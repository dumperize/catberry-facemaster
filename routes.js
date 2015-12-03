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
    '/:page[Pages, Breadcrumps]',
    '/:rubrika[Pages, Breadcrumps]/:podrubrika[rubrika/Rubrika, Breadcrumps]',
    {
        expression: '/:rubrika[Pages, Breadcrumps]/:podrubrika[rubrika/Rubrika, Breadcrumps]/:param[SeoText, rubrika/Rubrika, Breadcrumps]',
        map: function (state) {
            var section = ['video', 'sales', 'secrets', 'company'];
            var isSection;
            for (var i = 0; i < section.length; ++i) {
                if (state.SeoText.param == section[i]) {
                    state['rubrika/Rubrika'].section =
                        state.Breadcrumps.section = section[i];
                    isSection = true;
                }
            }
            if (!isSection) {
                state['rubrika/Rubrika'].tag =
                    state.SeoText.tag =
                        state.Breadcrumps.tag = state.SeoText.param;
            }
            return state;
        }
    },
    '/:rubrika[Pages, Breadcrumps]/:podrubrika[rubrika/Rubrika, Breadcrumps]/:tag[SeoText, rubrika/Rubrika,Breadcrumps]/:section[SeoText, rubrika/Rubrika, Breadcrumps]'
];
