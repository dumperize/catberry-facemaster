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
    '/:page[Head, Pages, Breadcrumps]',
    '/:rubrika[Head, Pages, Breadcrumps]/:podrubrika[rubrika/Rubrika, Head, Breadcrumps]',
    {
        expression: '/:rubrika[Head, Pages, Breadcrumps]/:podrubrika[rubrika/Rubrika, Head, Breadcrumps]/:param[rubrika/Rubrika, Head, Breadcrumps]',
        map: function (state) {
            var section = ['video', 'sale', 'secret', 'company'];
            var isSection;
            for (var i = 0; i < section.length; ++i) {
                if (state.Head.param == section[i]) {
                    state['rubrika/Rubrika'].section =
                        state.Head.section =
                            state.Breadcrumps.section = section[i];
                    isSection = true;
                }
            }
            if (!isSection) {
                state['rubrika/Rubrika'].tag =
                    state.Head.tag =
                        state.Breadcrumps.tag = state.Head.param;
            }
            return state;
        }
    }
    //{
    //	expression: '/:rubrika[Head, Pages, Breadcrumps]/:podrubrika[rubrika/Rubrika, Head, Breadcrumps]/sale',
    //	map: function(state){
    //		state['rubrika/Rubrika'].section = 'sale';
    //		return state;
    //	}
    //},
    //{
    //	expression: '/:rubrika[Head, Pages, Breadcrumps]/:podrubrika[rubrika/Rubrika, Head, Breadcrumps]/secret',
    //	map: function(state){
    //		state['rubrika/Rubrika'].section = 'secret';
    //		return state;
    //	}
    //},
    //{
    //	expression: '/:rubrika[Head, Pages, Breadcrumps]/:podrubrika[rubrika/Rubrika, Head, Breadcrumps]/company',
    //	map: function(state){
    //		state['rubrika/Rubrika'].section = 'company';
    //		return state;
    //	}
    //},
    //'/:rubrika[Head, Pages, Breadcrumps]/:podrubrika[rubrika/Rubrika, Head, Breadcrumps]/:tag[rubrika/Rubrika, Head, Breadcrumps]',
    //'/:rubrika[Head, Pages, Breadcrumps]/:podrubrika[rubrika/Rubrika, Head, Breadcrumps]/:tag[rubrika/Rubrika, Head, Breadcrumps]/:section[rubrika/Rubrika, Head, Breadcrumps]',
];
