'use strict';

var watcherLog = walle.helpers.watcherLog;

/**
 * Watcher for common scss(less or stylus)-files and scss(less or stylus)-files of plugins
 */
module.exports = function () {
    return walle.packages.chokidar.watch([
        'catberry_static/scss/**/*.scss',
        'catberry_static/scss/**/*.css'
    ], {
        ignored: '',
        persistent: true,
        ignoreInitial: true
    }).on('all', function (event, path) {
        watcherLog(event, path);
        walle.packages.gulp.start('css:compile-css');
    });
};
