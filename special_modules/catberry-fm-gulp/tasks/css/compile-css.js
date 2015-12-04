var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
//var gulpif = require('gulp-if');
//var autoprefixer = require('gulp-autoprefixer');
//var replace = require('gulp-replace-task');
var addsrc = require('gulp-add-src');
var notify = require('gulp-notify');
//var tarsConfig = require('../../../tars-config');
//var notifier = require('../../helpers/notifier');
//var browserSync = require('browser-sync');
;

//if (tarsConfig.autoprefixerConfig) {
//    useAutoprefixer = true;
//}

var scssFilesToConcatinate = [
    './catberry_static/scss/normalize.scss',
    './catberry_static/scss/libraries/**/*.scss',
    './catberry_static/scss/libraries/**/*.css',
    './catberry_static/scss/mixins.scss',
    './catberry_static/scss/sprites-scss/sprite_96.scss'
];
//
//if (tarsConfig.useSVG) {
//    scssFilesToConcatinate.push(
//        './catberry_static/scss/sprites-scss/svg-sprite.scss',
//        './catberry_static/scss/sprites-scss/svg-sprite-before.scss'
//    );
//}

scssFilesToConcatinate.push(
    './catberry_static/scss/fonts.scss',
    './catberry_static/scss/vars.scss',
    './catberry_static/scss/GUI.scss',
    './catberry_static/scss/common.scss',
    './catberry_static/scss/plugins/**/*.scss',
    './catberry_static/scss/plugins/**/*.css',
    './catberry_components/**/*.scss'
);

/**
 * Scss compilation
 * @param  {object} buildOptions
 */
module.exports = function (buildOptions) {

    return gulp.task('css:compile-css', function () {

        return gulp.src(scssFilesToConcatinate)
            .pipe(addsrc.append('./catberry_static/scss/etc/**/*.scss'))
            .pipe(concat('main' + buildOptions.hash + '.css'))
            .pipe(sass({
                errLogToConsole: false,
                onError: function (error) {
                    notify().write('\nAn error occurred while compiling css.\nLook in the console for details.\n');
                    return gutil.log(gutil.colors.red(error.message + ' on line ' + error.line + ' in ' + error.file));
                }
            }))
            //.pipe(
            //    gulpif(useAutoprefixer,
            //        autoprefixer(
            //            {
            //                browsers: tarsConfig.autoprefixerConfig,
            //                cascade: true
            //            }
            //        )
            //    )
            //)
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while autoprefixing css.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest('./dev/css/'))
            //.pipe(browserSync.reload({stream: true}))
            //.pipe(
            //    notifier('Scss-files\'ve been compiled')
            //);

    });
};