var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require("gulp-notify");
var concat = require('gulp-concat');
var rename = require('gulp-rename');

gulp.task('styles', function() {
    gulp.src('src/sass/style.scss')
    .pipe(sass({style: 'compressed', noCache: true}))
    .on('error', notify.onError({
        message: 'Error: <%= error.message %>'
    }))
    .pipe(gulp.dest('flo/assets/css/'));
});

gulp.task('js', function() {
    gulp.src('src/js/**/*.js')
   .on('error', notify.onError({
       message: 'Error: <%= error.message %>'
   }))
   .pipe(concat('app.js'))
   .pipe(gulp.dest('flo/assets/js'));
});

gulp.task('template', function() {
    return gulp.src('src/js/pages/**/template/*.html')
        .pipe(rename(function(path) {
            path.dirname = path.dirname.split('/')[0].substr(2);

            return path;
        }))
        .pipe(gulp.dest('flo/views/'));
});

gulp.task('images', function() {
    return gulp.src('src/js/modules/**/images/*')
        .pipe(rename(function(path) {
            path.dirname = path.dirname.split('/')[0];

            return path;
        }))
        .pipe(gulp.dest('flo/assets/images/'));
});

gulp.task('modules', function() {
    return gulp.src('src/js/modules/**/template/*.html')
        .pipe(rename(function(path) {
            path.dirname = path.dirname.split('/')[0];

            return path;
        }))
        .pipe(gulp.dest('flo/modules/'));
});

gulp.task('default',function() {
    gulp.watch('src/js/pages/**/template/*.html', ['template']);
    gulp.watch('src/js/modules/**/template/*.html', ['modules']);
    gulp.watch('src/js/modules/**/images/*', ['images']);
    gulp.watch('src/sass/**/*.scss',['styles']);
    gulp.watch('src/js/**/*.js',['js']);
});
