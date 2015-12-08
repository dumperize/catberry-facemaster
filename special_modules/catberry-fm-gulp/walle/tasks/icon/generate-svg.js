'use strict';

var gulp = walle.packages.gulp;
var svgSymbols = walle.packages.svgSymbols;
var notifier = walle.helpers.notifier;
var cheerio = walle.packages.cheerio;

module.exports = function () {
    return gulp.task('svg:generate-svg', function () {
        return gulp.src('./' + walle.config.fs.staticFolderName + '/icon-svg/*.svg')
            .pipe(cheerio({
                run: function ($, file) {
                    if (file.history[0].slice(-9) != 'color.svg'){
                        $('[fill]').removeAttr('fill');
                        $('[style]').removeAttr('style');
                    }
                },
                parserOptions: { xmlMode: true }
            }))
            .pipe(svgSymbols({
                id: 'icon_%f',
                className:'.icon .icon_%f',
                title:'icon_%f',
                templates: ['default-svg', 'default-demo']
            }))
            .pipe(gulp.dest('./public/icon-svg/'))
            .pipe(
                notifier.success('Scss-files\'ve been compiled')
            );
    });
};