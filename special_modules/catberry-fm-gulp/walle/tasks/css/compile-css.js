'use strict';

var gulp = walle.packages.gulp;
var gutil = walle.packages.gutil;
var gulpif = walle.packages.gulpif;
var concat = walle.packages.concat;
var sass = walle.packages.sass;
var autoprefixer = walle.packages.autoprefixer;
walle.packages.promisePolyfill.polyfill();
var postcss = walle.packages.postcss;
var replace = walle.packages.replace;
var sourcemaps = walle.packages.sourcemaps;
var plumber = walle.packages.plumber;
var importify = walle.packages.importify;
var notifier = walle.helpers.notifier;

var scssFolderPath = './' + walle.config.fs.staticFolderName + '/scss';
var modulesFolderPath = './' + walle.config.fs.modulesFolderName;
var patterns = [];
var generateSourceMaps = walle.config.sourcemaps.css.active && !walle.flags.release && !walle.flags.min;
var sourceMapsDest = walle.config.sourcemaps.css.inline ? '' : '.';

/** postcss **/
var postcssProcessors = walle.config.postcss;
var processors = [];

if (postcssProcessors && postcssProcessors.length) {
    postcssProcessors.forEach(function (processor) {
        processors.push(require(processor.name)(processor.options));
    });
}
if (walle.config.autoprefixerConfig) {
    processors.push(
        autoprefixer({browsers: walle.config.autoprefixerConfig})
    );
}
/** postcss end **/

var scssFilesToConcatinate = [
    scssFolderPath + '/normalize.{scss,sass}',
    scssFolderPath + '/libraries/**/*.{scss,sass,css}',
    scssFolderPath + '/mixins.{scss,sass}',
    scssFolderPath + '/sprites-scss/sprite_96.{scss,sass}'
];

if (walle.config.useSVG) {
    scssFilesToConcatinate.push(
        scssFolderPath + '/sprites-scss/svg-sprite.{scss,sass}'
    );
}
console.log(modulesFolderPath);
scssFilesToConcatinate.push(
    scssFolderPath + '/fonts.{scss,sass}',
    scssFolderPath + '/vars.{scss,sass}',
    scssFolderPath + '/GUI.{scss,sass}',
    scssFolderPath + '/icons.{scss,sass}',
    scssFolderPath + '/common.{scss,sass,css}',
    scssFolderPath + '/plugins/**/*.{scss,sass,css}',
    modulesFolderPath + '/**/*.{scss,sass}',
    '!' + modulesFolderPath + '/**/_*.{scss,sass,css}'
);

scssFilesToConcatinate.push(scssFolderPath + '/etc/**/*.{scss,sass,css}');

patterns.push(
    {
        match: '%=staticPrefixForCss=%',
        replacement: walle.config.staticPrefixForCss()
    }
);


/**
 * Scss compilation
 */
module.exports = function () {
    return gulp.task('css:compile-css', function () {
        return gulp.src(scssFilesToConcatinate, {base: process.cwd()})
            .pipe(gulpif(generateSourceMaps, sourcemaps.init()))
            .pipe(plumber({
                errorHandler: function (error) {
                    notifier.error('An error occurred while compressing css.', error);
                    this.emit('end');
                }
            }))
            .pipe(importify('main.scss', {
                cssPreproc: 'scss'
            }))
            .pipe(sass({
                outputStyle: 'expanded',
                includePaths: process.cwd()
            }))
            .pipe(replace({
                patterns: patterns,
                usePrefix: false
            }))
            .pipe(postcss(processors))
            .pipe(concat('main' + walle.options.build.hash + '.css'))
            .pipe(gulpif(generateSourceMaps, sourcemaps.write(sourceMapsDest)))
            .pipe(gulp.dest('./public/css/'))
            .pipe(
                notifier.success('Scss-files\'ve been compiled')
            );
    });
};