var gulp = walle.packages.gulp;
var concat = walle.packages.concat;
var filter = walle.packages.filter;
var order = walle.packages.order;
var csso = walle.packages.csso;
var rename = walle.packages.rename;
var mainBowerFiles = walle.packages.bower;

module.exports = function () {
    return gulp.task('bower:compile-vendor-css', function () {
        var vendors = mainBowerFiles();

        return gulp.src(vendors)
            .pipe(filter('**.css'))
            .pipe(order(vendors))
            .pipe(concat('vendor.css'))
            .pipe(csso())
            .pipe(rename({
                suffix: ".min"
            }))
            .pipe(gulp.dest('public/css/'));
    });
}