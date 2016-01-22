var gulp = walle.packages.gulp;
var concat = walle.packages.concat;
var filter = walle.packages.filter;
var csso = walle.packages.csso;
var rename = walle.packages.rename;
var mainBowerFiles = walle.packages.bower;
var cssUrl = walle.packages.cssUrl;

module.exports = function () {
    return gulp.task('bower:compile-vendor-css', function () {
        var vendors = mainBowerFiles();

        return gulp.src(vendors)
            .pipe(filter('**.css'))
            .pipe(cssUrl({
                modify: function (url, filePath) {
                    var result = filePath.match( /\/bower_components([\S]*)\// );
                    return result[1] + '/' + url;
                },
                prepend: '/img/vendor',
                append: ''
            }))
            .pipe(concat('vendor.css'))
            .pipe(csso())
            .pipe(rename({
                suffix: ".min"
            }))
            .pipe(gulp.dest('public/css/'));
    });
}