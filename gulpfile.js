const gulp        = require('gulp');
const browserSync = require('browser-sync');
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
});

gulp.task('styles', function() {
    return gulp.src("src/css/main.css")
    .pipe(rename({
        prefix: "",
        suffix: ".min",
    }))
    .pipe(autoprefixer())
    .pipe(cleanCSS({compatibility: 'ie8', format: 'beautify'}))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html", gulp.parallel('html'));
    gulp.watch("src/*.js", gulp.parallel('scripts'));
});

gulp.task('html', function() {
    return gulp.src('src/*.html')
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    return gulp.src('src/*.js')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('assets', function() {
    return gulp.src('src/**/*.+(svg|jpg)')
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('default', gulp.parallel('browser-sync', 'styles', 'watch', 'html', 'scripts', 'assets'));