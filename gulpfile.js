const fs = require('fs')
const gulp = require('gulp');
const gutil = require("gulp-util");
const sourcemaps = require('gulp-sourcemaps');
const jade = require('gulp-jade');
const sass = require('gulp-sass');
const svgSprite = require('gulp-svg-sprite');
const browserSync = require('browser-sync').create();

gulp.task('build:svg', () => {
  return gulp.src('./svg/*.svg')
    .pipe(svgSprite({
      mode: {
        symbol: {
          inline : true
        }
      }
    }))
    .pipe(gulp.dest('svg_sprite'));
});

gulp.task('build:jade', () => {
  return gulp.src('./*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream())
});

gulp.task('build:sass', () => {
  console.log(process.env.NODE_ENV);
  return gulp.src('./sass/styles.sass')
    .pipe(process.env.NODE_ENV === "production" ? gutil.noop() : sourcemaps.init())
      .pipe(sass({
          outputStyle: 'expanded'
      }).on('error', sass.logError))
    .pipe(process.env.NODE_ENV === "production" ? gutil.noop() : sourcemaps.write())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream())
});

gulp.task('build', ['build:jade', 'build:sass'])

gulp.task('serve', ['build'], () => {
  browserSync.init({
      server: "./",
      files: ["js/*.js"],
      open: false
  });
  gulp.watch('./sass/**/*.*', ['build:sass']);
  gulp.watch(['./**/*.jade','./svg/*.svg'], ['build:jade'])
});
