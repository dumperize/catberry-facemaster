'use strict';

var watcherLog = walle.helpers.watcherLog;

/**
 * Watch for modules' css-files
 */
module.exports = function () {
    return walle.packages.chokidar.watch('catberry_components/**/*.scss')
        .on('all', function (event, path) {
            watcherLog(event, path);
            walle.packages.gulp.start('css:compile-css');
        });
};
