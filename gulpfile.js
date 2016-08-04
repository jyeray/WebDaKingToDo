var gulp = require('gulp');
var inject = require('gulp-inject');

gulp.task('index', function () {
    var target = gulp.src('./views/layout.jade');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src(['./public/**/*.js', './public/**/*.css'], {read: false});

    return target.pipe(inject(sources))
        .pipe(gulp.dest('./views'));
});


var bowerFiles = require('main-bower-files'),
    stylus = require('gulp-stylus'),
    es = require('event-stream');

gulp.task('index-bower', function () {
    var cssFiles = gulp.src('./src/**/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./views'));

    gulp.src('./views/layout.jade')
        .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
        .pipe(inject(es.merge(
            cssFiles,
            gulp.src('./src/app/**/*.js', {read: false})
        )))
        .pipe(gulp.dest('./views'));
});