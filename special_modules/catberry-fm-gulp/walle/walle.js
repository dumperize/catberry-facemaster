'use strict';

var gutil = require('gulp-util');


// Walle is a global var
global.walle = {};

var walleConfig = require('./config');
var buildOptions = {};

walle.say = function say(message) {
    console.log(gutil.colors.cyan.bold('[ WallE ]: ') + gutil.colors.white.bold(message));
};

// WallE config
walle.config = walleConfig;

// Flags
walle.flags = gutil.env;

// Generate start screen
require('./helpers/start-screen-generator')(gutil);

// Required packages
walle.packages = {
    autoprefixer: require('autoprefixer'),
    //babel: require('gulp-babel'),
    //browserSync: require('browser-sync'),
    //cache: require('gulp-cached'),
    //changed: require('gulp-changed'),
    chokidar: require('chokidar'),
    concat: require('gulp-concat'),
    csso: require('gulp-csso'),
    //data: require('gulp-data'),
    //del: require('del'),
    //download: require('download'),
    gulp: require('gulp'),
    //gulpHandlebars: require('gulp-compile-handlebars'),
    gulpif: require('gulp-if'),
    gutil: gutil,
    //handlebars: require('handlebars'),
    //htmlMin: require('gulp-minify-html'),
    //htmlPrettify: require('gulp-html-prettify'),
    imagemin: require('gulp-imagemin'),
    importify: require('gulp-importify'),
    //jscs: require('gulp-jscs'),
    //jshint: require('gulp-jshint'),
    //mkdirp: require('mkdirp'),
    //ncp: require('ncp'),
    notify: require('gulp-notify'),
    plumber: require('gulp-plumber'),
    postcss: require('gulp-postcss'),
    promisePolyfill: require('es6-promise'),
    rename: require('gulp-rename'),
    replace: require('gulp-replace-task'),
    runSequence: require('run-sequence'),
    sass: require('gulp-sass'),
    sourcemaps: require('gulp-sourcemaps'),
    //spritesmith: require('gulp.spritesmith'),
    //stripDebug: require('gulp-strip-debug'),
    //svg2png: require('gulp-svg2png'),
    //svgspritesheet: require('gulp-svg-spritesheet'),
    //streamCombiner: require('stream-combiner'),
    //through2: require('through2'),
    uglify: require('gulp-uglify'),
    cheerio: require('gulp-cheerio'),
    //zip: require('gulp-zip')
    svgSymbols: require('gulp-svg-symbols'),
    filter: require('gulp-filter'),
    order: require('gulp-order'),
    bower: require('main-bower-files')
};

// Links to helpers
walle.helpers = {
    dateFormatter: require('./helpers/modify-date-formatter'),
    fileLoader: require('./helpers/file-loader'),
    notifier: require('./helpers/notifier'),
    //setUlimit: require('./helpers/set-ulimit'),
    watcherLog: require('./helpers/watcher-log')
};

// Info about css preprocessor
walle.cssPreproc = {
    name: 'scss',
    ext: '{scss,sass}'
};

// Build options
walle.options = {
    notify: true,
    build: {
        hash: walle.flags.release ? Math.random().toString(36).substring(7) : ''
    }
};
