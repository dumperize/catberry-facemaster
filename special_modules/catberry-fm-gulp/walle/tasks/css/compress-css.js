'use strict';

var gulp = walle.packages.gulp;
var csso = walle.packages.csso;
var rename = walle.packages.rename;
var plumber = walle.packages.plumber;
var notifier = walle.helpers.notifier;

/**
 * Compress css-files
 */
module.exports = function () {
    return gulp.task('css:compress-css', function () {
        return gulp.src('/public/css/main.css')
            .pipe(plumber({
                errorHandler: function (error) {
                    notifier.error('An error occurred while compressing css.', error);
                }
            }))
            .pipe(csso(true))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest('/public/css/'))
            .pipe(
                notifier.success('Css\'ve been minified')
            );
    });
};
