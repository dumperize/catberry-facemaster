'use strict';

/**
 * Output in the begining
 */
module.exports = function (gutil) {

    if (!walle.flags.release && !walle.flags.min) {
        console.log(gutil.colors.yellow.inverse('\n----------------------------------------------------------------------'));
        walle.say(gutil.colors.red.bold('Started WallE via gulp.'));
        walle.say(gutil.colors.red.bold('This mode is depricated for developing.'));
        console.log(gutil.colors.yellow.inverse('\n----------------------------------------------------------------------'));
    }

    console.log('\n----------------------------------------------------------------------------');
    walle.say(gutil.colors.white.bold('Build have been started. You are using:\n'));

    if (walle.flags.release) {
        walle.say(gutil.colors.cyan.bold('• release mode;'));
    }

    if (walle.flags.min) {
        walle.say(gutil.colors.cyan.bold('• minify mode;'));
    }

    console.log('\n');
    walle.say(gutil.colors.white.bold('Have a nice work!'));
    walle.say(gutil.colors.white.bold('Please wait for a moment, while I\'m preparing builder for working...'));

    console.log('----------------------------------------------------------------------------\n');
};
