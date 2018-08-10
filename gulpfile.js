/**
 * Created by nap on 17/6/26.
 */
var gulp = require('gulp')
var less = require('gulp-less')
var cssmin = require('gulp-minify-css')
var notify = require('gulp-notify')
var plumber = require('gulp-plumber')
// var del = require('del')
// var gulpFilter = require('gulp-filter')
var rename = require('gulp-rename')

var paths = ['src/**/*.less']

gulp.task('watch', ['less'], function () {
  gulp.watch(paths, ['less'])
})

gulp.task('less', function () {
  return gulp.src(paths)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(less())
    .pipe(rename(function (path) {
      path.extname = '.wxss'
    }))
    .pipe(gulp.dest('src'))
})

gulp.task('build', function () {
  return gulp.src(paths)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(less())
    .pipe(cssmin())
    .pipe(rename(function (path) {
      path.extname = '.wxss'
    }))
    .pipe(gulp.dest('src'))
})
