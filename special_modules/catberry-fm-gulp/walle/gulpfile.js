'use strict';

// walle main moduels init
// It is a global var
require('./walle');

// Using modules
var path = require('path');
var gulp = walle.packages.gulp;
var gutil = walle.packages.gutil;
var runSequence = walle.packages.runSequence.use(gulp);
var env;

// Configs
var notify = walle.packages.notify;

/***********/
/* HELPERS */
/***********/
var fileLoader = walle.helpers.fileLoader;
/***************/
/* END HELPERS */
/***************/


/*********/
/* TASKS */
/*********/

fileLoader('/tasks').forEach(function (file) {
    require('.' + file)();
});
/*************/
/* END TASKS */
/*************/



/***********/
/* WATCHERS */
/***********/
gulp.task('dev', ['build-dev'], function () {
    walle.options.notify = true;

    // require watchers
    fileLoader('/watchers').forEach(function (file) {
        require('.' + file)();
    });
    walle.say('Build has been created!');
});
/****************/
/* END WATCHERS */
/****************/



/**************/
/* MAIN TASKS */
/**************/

// Build dev-version (without watchers)
// You can add your own tasks in queue
gulp.task('build-dev', function (cb) {
    walle.options.notify = false;
    runSequence(
        [
            'css:compile-css',
            'bower:compile-vendor-js', 'bower:compile-vendor-css', 'bower:move-vendor-img',
            'svg:generate-svg'
        ],
        //'service:clean',
        //['images:minify-svg', 'images:raster-svg'],
        //[
        //    'css:make-sprite-for-svg', 'css:make-fallback-for-svg', 'css:make-sprite'
        //],
        //[
        //    'css:compile-css', 'css:compile-css-for-ie8',
        //    'html:concat-modules-data',
        //    'js:move-separate', 'js:processing'
        //],
        //[
        //    'html:compile-templates',
        //    'other:move-misc-files', 'other:move-fonts', 'other:move-assets',
        //    'images:move-content-img', 'images:move-plugins-img', 'images:move-general-img'
        //],
        cb
    );
});

// Build release version
// Also you can add your own tasks in queue of build task
gulp.task('build', function () {
    runSequence(
        'build-dev',
        [
            'html:minify-html', 'images:minify-raster-img'
        ],
        'service:pre-build',
        [
            'css:compress-css'
        ],
        'service:zip-build',
        function () {
            console.log(gutil.colors.black.bold('\n------------------------------------------------------------'));
            walle.say(gutil.colors.green('✔') + gutil.colors.green.bold(' Build has been created successfully!'));

            if (walle.config.useBuildVersioning) {
                walle.say(gutil.colors.white.bold('Build version is: ', tars.options.build.version));
            }
            console.log(gutil.colors.black.bold('------------------------------------------------------------\n'));
        }
    );
});

// Default task. Just start build task
gulp.task('default', function () {
    gulp.start('build');
});

// Init task. Just start init task
gulp.task('init', function () {
    gulp.start('service:init');
});

// Re-init task. Just start re-init task
gulp.task('re-init', function () {
    gulp.start('service:re-init');
});

// Update-deps task. Just start update-deps task
gulp.task('update-deps', function () {
    gulp.start('service:update-deps');
});


/******************/
/* END MAIN TASKS */
/******************/

/*****************/
/* HELPERS TASKS */
/*****************/

gulp.task('svg-actions', function (cb) {
    if (tars.flags.ie8 || tars.flags.ie) {
        runSequence(
            ['images:minify-svg', 'images:raster-svg'],
            ['css:make-fallback-for-svg', 'css:make-sprite-for-svg'],
            cb
        );
    } else {
        runSequence(
            'images:minify-svg',
            'css:make-sprite-for-svg',
            cb
        );
    }
});

gulp.task('compile-templates-with-data-reloading', function (cb) {
    runSequence(
        'html:concat-modules-data',
        'html:compile-templates',
        cb
    );
});

/*********************/
/* END HELPERS TASKS */
/*********************/


module.exports = {
//var test = {
    setEnv: function (obj) {
        env = obj;
    },
    start: function () {
        if (env._isRelease) {
            gulp.start('build');
        } else {
            gulp.start('dev');
        }
    }
};
