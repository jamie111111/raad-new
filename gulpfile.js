const gulp = require ('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoPrefixer = require('gulp-autoprefixer');

var sassOptions = {
    errLogToConsole:true,
    outputStyle:'expanded'
};

//compile sass
gulp.task('sass', function() {
    return gulp.src(['src/scss/*.scss'])
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoPrefixer())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});

//Watch and serve
gulp.task('serve', ['sass'], function(){
    browserSync.init({
        server: './src'
    });

    gulp.watch(['src/scss/**/*.scss'],['sass']);
    gulp.watch(['src/*html']).on('change', browserSync.reload);
});

//Default
gulp.task('default', ['serve']);