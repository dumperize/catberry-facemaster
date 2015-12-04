'use strict';

var path = require('path'),
    task = require('../tasks/compile-named-less');

module.exports = function (gulp, plugins, config) {
    return {
        dependencies: ['csstime-concat-less'],
        task: function () {
            return task.run(config.stylesFileName, gulp, plugins, config);
        }
    };
};