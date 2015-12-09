var gulp = walle.packages.gulp;
var concat = walle.packages.concat;
var order = walle.packages.order;
var uglify = walle.packages.uglify;
var rename = walle.packages.rename;
var mainBowerFiles = walle.packages.bower;

module.exports = function () {
    return gulp.task('bower:compile-vendor-js', function () {
        var vendors = mainBowerFiles();
        var filterVendors = vendors.filter(function (str) {
            return str.slice(-3) == '.js'
        });

        return gulp.src(filterVendors)
            .pipe(concat('vendor.js'))
            .pipe(uglify())
            .pipe(rename({
                suffix: ".min"
            }))
            .pipe(gulp.dest('public/'));
    });
}