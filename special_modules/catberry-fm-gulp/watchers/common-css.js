var gulp = require('gulp');
var gutil = require('gulp-util');
var chokidar = require('chokidar');
//var watcherLog = require('../../helpers/watcher-log');

/**
 * Watcher for common scss(less or stylus)-files and scss(less or stylus)-files of plugins
 * @param  {Object} watchOptions
 */
module.exports = function (watchOptions) {
    return chokidar.watch([
        'catberry_static/scss/**/*.scss',
        'catberry_static/scss/**/*.css'
    ], {
        ignored: '',
        persistent: true,
        ignoreInitial: true
    }).on('all', function (event, path) {
        //watcherLog(event, path);
        gulp.start('css:compile-css');
    });
};