'use strict';

const gulp        = require('gulp');
const sass =  require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
});

// sass module
// gulp.task('sass', function() {
//     return gulp.src('.src/sass/*.sass')
//     .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
//     .pipe(gulp.dest('.src/css'));
// });


// gulp.task('styles', function() {
//     return gulp.src('src/sass/**/*.sass')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest('src/css/'));
// });

gulp.task('styles', function() {
    return gulp.src("src/sass/*.+(scss|sass)")
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename({
                prefix: "",
                suffix: ".min",
              }))
            .pipe(autoprefixer({
                cascade: false
             }))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest('src/css'))
            .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    // gulp.watch("src/sass/*.+(scss|sass)", gulp.parallel("styles"));
    gulp.watch("src/sass/*.+(scss|sass)", gulp.parallel("styles"));
    gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));