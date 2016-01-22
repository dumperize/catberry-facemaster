var gulp = walle.packages.gulp;
var mainBowerFiles = walle.packages.bower;

module.exports = function () {
    return gulp.task('bower:move-vendor-img', function () {
        var path = './bower_components/';
        var vendors = mainBowerFiles();

        var filterVendors = vendors.filter(function (str) {
            return (str.slice(-4) == '.png') || (str.slice(-4) == '.gif') || (str.slice(-4) == '.jpg')
        });


        return gulp.src(filterVendors, {base: path})
            .pipe(gulp.dest('public/img/vendor'));
    });
};