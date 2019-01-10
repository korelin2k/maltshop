var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("./tsconfig.json");

gulp.task('copy-config', function() {
    return gulp.src('./src/config/*.json')
        .pipe(gulp.dest('./build/config'));
});

gulp.task('compile-tsc', function() {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("./build"));
});

gulp.task('default', gulp.series('compile-tsc', 'copy-config'));